# 🚀 GUÍA MAESTRA: CONTRATOMATE MODERNIZADO (Next.js 15, Better Auth, Prisma, Supabase)

Esta es tu guía paso a paso para construir el MVP. Sigue cada fase en orden.

---

## 📅 DÍA 1: Cimientos y Base de Datos

### 1. Crear el Proyecto

```bash
npx create-next-app@latest contratomate-moderno
# Responde:
# TypeScript: Yes
# ESLint: Yes
# Tailwind: Yes
# src/ directory: Yes
# App Router: Yes
# Import alias: @/* (por defecto)
```

### 2. Instalar Librerías Base

```bash
cd contratomate-moderno
# Instalar Shadcn/UI y componentes base
npx shadcn@latest init
npx shadcn@latest add button input card table dialog form sheet dropdown-menu toast

# Instalar Prisma y Cliente
npm install prisma --save-dev
npm install @prisma/client

# Inicializar Prisma
npx prisma init
```

### 3. Configurar Supabase (Postgres)

1.  Ve a [Supabase](https://supabase.com) y crea un proyecto.
2.  Ve a **Project Settings > Database > Connection Pooling**.
3.  Copia la **String de Conexión (Transaction Mode)**. Reemplaza `[YOUR-PASSWORD]`.
4.  Pégala en tu archivo `.env`:
    ```env
    DATABASE_URL="postgresql://postgres.[REF]:[PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"
    DIRECT_URL="postgresql://postgres.[REF]:[PASSWORD]@aws-0-us-east-1.supabase.cloud:5432/postgres"
    ```
    _(Nota: `DIRECT_URL` es necesaria para migraciones de Prisma. Consíguela desactivando "Use connection pooling" momentáneamente o copiando la opción "Session Mode" y ajustando el puerto a 5432)._

### 4. Definir Esquema (Schema) en Prisma

Abre `prisma/schema.prisma` y define tus modelos:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}

// Modelos para Better Auth
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  emailVerified Boolean?
  image         String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  sessions      Session[]
  accounts      Account[]

  @@map("user")
}

model Session {
  id        String   @id
  expiresAt DateTime
  token     String
  createdAt DateTime
  updatedAt DateTime
  ipAddress String?
  userAgent String?
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([token])
  @@map("session")
}

model Account {
  id           String    @id
  accountId    String
  providerId   String
  userId       String
  user         User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  accessToken  String?
  refreshToken String?
  idToken      String?
  expiresAt    DateTime?
  password     String?

  @@map("account")
}

model Verification {
  id         String   @id
  identifier String
  value      String
  expiresAt  DateTime
  createdAt  DateTime?
  updatedAt  DateTime?

  @@map("verification")
}

// Modelos de Negocio
model Contractor {
  id             String     @id @default(cuid())
  tipoPersona    String     // NATURAL, JURIDICA
  identificacion String     @unique
  nombre         String
  email          String?
  telefono       String?
  ciudad         String?
  activo         Boolean    @default(true)
  createdAt      DateTime   @default(now())
  contracts      Contract[]

  @@map("contractors")
}

model Contract {
  id            String     @id @default(cuid())
  vigencia      Int
  numeroProceso String     @unique
  objeto        String
  valor         Float
  tieneIva      Boolean    @default(false)
  contractorId  String
  contractor    Contractor @relation(fields: [contractorId], references: [id])
  estado        String     @default("BORRADOR")
  createdAt     DateTime   @default(now())

  @@map("contracts")
}
```

### 5. Sincronizar con DB

```bash
npx prisma migrate dev --name init
```

---

## 📅 DÍA 2: Autenticación con Better Auth

### 1. Instalar Better Auth

```bash
npm install better-auth
```

### 2. Configurar Cliente (`lib/auth.ts`)

```typescript
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
});
```

### 3. Crear API Route (`app/api/auth/[...all]/route.ts`)

```typescript
import { auth } from "@/lib/auth"; // Ajusta ruta según tu estructura
import { toNextJsHandler } from "better-auth/next-js";

export const { GET, POST } = toNextJsHandler(auth);
```

### 4. Crear Cliente React (`lib/auth-client.ts`)

```typescript
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000", // Cambiar en producción
});
```

---

## 📅 DÍA 3: Server Actions y Contratistas

Las Server Actions reemplazan las llamadas API manuales. Ejemplo para crear un contratista:

### `actions/contractors.ts`

```typescript
"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const prisma = new PrismaClient();

const schema = z.object({
  nombre: z.string().min(1),
  identificacion: z.string().min(1),
  // ... más validaciones
});

export async function createContractor(formData: FormData) {
  const data = schema.parse({
    nombre: formData.get("nombre"),
    identificacion: formData.get("identificacion"),
    // ...
  });

  await prisma.contractor.create({
    data: {
      nombre: data.nombre,
      identificacion: data.identificacion,
      tipoPersona: "NATURAL", // Ejemplo
    },
  });

  revalidatePath("/contratistas");
}
```

---

## 📅 DÍA 4: Contratos y Lógica de Negocio

### Tip Pro: Cálculo de IVA en el Servidor

Al crear el contrato, haz el cálculo en la Server Action para seguridad:

```typescript
// actions/contracts.ts
const IVA_RATE = 0.19;

export async function createContract(data: any) {
  let valorFinal = data.valor;
  if (data.tieneIva) {
    valorFinal = data.valor * (1 + IVA_RATE);
  }

  await prisma.contract.create({
    data: {
      ...data,
      valor: valorFinal,
    },
  });
}
```

---

Guarda esta guía y consúltala en cada paso. ¡A trabajar! 🚀
