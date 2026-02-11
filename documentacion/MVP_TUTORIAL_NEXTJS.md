# 🚀 MVP TUTORIAL: CONTRATOMATE MINI
## Aprende Next.js 14 + React 19 desde cero con proyecto real

**Objetivo:** Aprender Next.js 14 construyendo un mini sistema de contratos funcional  
**Duración:** 3-5 días (a tu ritmo)  
**Nivel:** Principiante-Intermedio  
**Versión:** Next.js 14 + React 19

---

## 🎯 QUÉ VAMOS A CONSTRUIR

### Mini ContratoMate - Alcance del MVP

```
Funcionalidades:
✅ Login simple (email/password)
✅ Listar contratistas (tabla)
✅ Crear contratista (formulario)
✅ Ver detalle de contratista
✅ Listar contratos (tabla con filtro)
✅ Crear contrato (formulario con cálculo automático de IVA)
✅ Generar documento Word simple
✅ Dashboard con estadísticas básicas
```

### Lo que aprenderás

```typescript
✅ Server Components (cargar datos)
✅ Client Components (interactividad)
✅ Server Actions (crear/actualizar/eliminar)
✅ API Routes (generar documento)
✅ Formularios con validación
✅ Supabase (BD + Auth + Storage)
✅ Cálculos en tiempo real
✅ Navegación entre páginas
✅ Layouts compartidos
```

### Stack Ultra-Simple

```yaml
Frontend: Next.js 14 + React 19
Base de Datos: Supabase (Cloud - GRATIS)
UI: Shadcn/UI (componentes listos)
Validación: Zod
Formularios: React Hook Form
```

---

## 📚 ÍNDICE DEL TUTORIAL

### Parte 1: Setup y Fundamentos (Día 1)
1. [Crear proyecto](#parte-1-crear-proyecto)
2. [Entender estructura](#estructura-del-proyecto)
3. [Server vs Client Components](#server-vs-client)
4. [Primera página funcional](#primera-página)

### Parte 2: Base de Datos (Día 2)
5. [Setup Supabase Cloud](#setup-supabase)
6. [Crear tablas](#crear-tablas)
7. [Leer datos (Server Component)](#leer-datos)
8. [Mostrar en tabla](#mostrar-tabla)

### Parte 3: Autenticación (Día 2-3)
9. [Login funcional](#login)
10. [Proteger rutas](#proteger-rutas)
11. [Logout](#logout)

### Parte 4: CRUD con Server Actions (Día 3-4)
12. [Crear contratista](#crear-contratista)
13. [Actualizar contratista](#actualizar-contratista)
14. [Eliminar contratista](#eliminar-contratista)

### Parte 5: Lógica Avanzada (Día 4-5)
15. [Formulario de contrato con cálculo IVA](#formulario-contrato)
16. [Filtros dinámicos](#filtros)
17. [API Route para generar Word](#generar-word)
18. [Dashboard con stats](#dashboard)

---

## 🎬 PARTE 1: CREAR PROYECTO (30 minutos)

### Paso 1: Crear Proyecto Next.js

```bash
# Abrir terminal y ejecutar
npx create-next-app@latest contratomate-mini

# Responder las preguntas:
✓ Would you like to use TypeScript? → Yes
✓ Would you like to use ESLint? → Yes
✓ Would you like to use Tailwind CSS? → Yes
✓ Would you like to use `src/` directory? → Yes
✓ Would you like to use App Router? → Yes
✓ Would you like to customize the default import alias? → No

cd contratomate-mini
npm run dev
```

**✅ Checkpoint:** Abre http://localhost:3000 - Debes ver la página de inicio de Next.js

### Paso 2: Instalar Dependencias

```bash
# Supabase
npm install @supabase/supabase-js @supabase/ssr

# UI Components
npm install lucide-react clsx tailwind-merge date-fns

# Formularios y validación
npm install react-hook-form @hookform/resolvers zod

# Shadcn (componentes pre-hechos)
npx shadcn-ui@latest init

# Cuando pregunte, responde:
✓ Style → Default
✓ Base color → Slate
✓ CSS variables → Yes

# Instalar componentes de Shadcn que usaremos
npx shadcn-ui@latest add button
npx shadcn-ui@latest add input
npx shadcn-ui@latest add label
npx shadcn-ui@latest add table
npx shadcn-ui@latest add card
npx shadcn-ui@latest add form
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add select
npx shadcn-ui@latest add tabs
```

**✅ Checkpoint:** Ejecuta `npm run dev` - No debe haber errores

---

## 📁 ESTRUCTURA DEL PROYECTO

### Entender la estructura

```
contratomate-mini/
├── src/
│   ├── app/                    # ← AQUÍ VA TODO
│   │   ├── (auth)/            # Rutas de login
│   │   │   └── login/
│   │   │       └── page.tsx
│   │   │
│   │   ├── (dashboard)/       # Rutas protegidas
│   │   │   ├── layout.tsx     # Layout compartido
│   │   │   ├── page.tsx       # Dashboard
│   │   │   ├── contratistas/
│   │   │   │   ├── page.tsx           # Lista
│   │   │   │   ├── nuevo/
│   │   │   │   │   └── page.tsx       # Crear
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx       # Detalle
│   │   │   └── contratos/
│   │   │       ├── page.tsx           # Lista
│   │   │       └── nuevo/
│   │   │           └── page.tsx       # Crear
│   │   │
│   │   ├── actions/           # Server Actions
│   │   │   └── contractors.ts
│   │   │
│   │   ├── api/               # API Routes
│   │   │   └── documents/
│   │   │       └── route.ts
│   │   │
│   │   ├── layout.tsx         # Layout raíz
│   │   └── page.tsx           # Home
│   │
│   ├── components/            # Componentes reutilizables
│   │   ├── ui/               # Shadcn components
│   │   └── contractors/
│   │       └── ContractorForm.tsx
│   │
│   └── lib/                   # Utilidades
│       ├── supabase/
│       │   ├── client.ts     # Cliente browser
│       │   └── server.ts     # Cliente servidor
│       └── utils.ts
│
├── .env.local                 # Variables de entorno
└── package.json
```

### Conceptos clave de carpetas

```typescript
// ========== CARPETAS CON PARÉNTESIS () ==========
// (auth), (dashboard) → NO crean rutas

app/
├── (auth)/
│   └── login/
│       └── page.tsx          // Ruta: /login (no /auth/login)

// ========== CARPETAS CON CORCHETES [] ==========
// [id] → Rutas dinámicas

app/
├── contratistas/
│   └── [id]/
│       └── page.tsx          // Ruta: /contratistas/123

// ========== ARCHIVOS ESPECIALES ==========
page.tsx      → Define una ruta visible
layout.tsx    → Define UI compartida
route.ts      → Define API endpoint
loading.tsx   → UI mientras carga
error.tsx     → UI de error
```

---

## 🔵 SERVER VS CLIENT COMPONENTS

### Regla de Oro

```typescript
// ========== SERVER COMPONENT (por defecto) ==========
// NO lleva 'use client'
// Puede: acceder BD, usar async/await
// NO puede: useState, onClick, useEffect

// app/contratistas/page.tsx
export default async function Page() {  // ← async
  const data = await fetch(...)  // ← Directo!
  return <div>{data}</div>
}

// ========== CLIENT COMPONENT ==========
// LLEVA 'use client' arriba
// Puede: useState, onClick, useEffect
// NO puede: acceso directo a BD

// app/contratistas/Form.tsx
'use client'  // ← OBLIGATORIO

import { useState } from 'react'

export default function Form() {
  const [name, setName] = useState('')  // ← useState funciona
  return <input onChange={(e) => setName(e.target.value)} />
}
```

### Cuándo usar cada uno

| Necesitas | Usa |
|-----------|-----|
| Mostrar datos de BD | Server Component |
| Formulario con validación | Client Component |
| Tabla simple | Server Component |
| Tabla con filtros interactivos | Client Component |
| Botón con onClick | Client Component |
| Layout estático | Server Component |

### Patrón Común (el que más usarás)

```typescript
// ========== SERVER (Padre - carga datos) ==========
// app/contratistas/page.tsx

import { supabase } from '@/lib/supabase/server'
import ContractorsList from './ContractorsList'  // Client

export default async function Page() {
  const { data } = await supabase.from('contractors').select('*')
  
  return <ContractorsList data={data} />  // Pasa datos al hijo
}

// ========== CLIENT (Hijo - interactividad) ==========
// app/contratistas/ContractorsList.tsx

'use client'

export default function ContractorsList({ data }) {
  const [filter, setFilter] = useState('')
  
  const filtered = data.filter(c => c.nombre.includes(filter))
  
  return (
    <div>
      <input onChange={(e) => setFilter(e.target.value)} />
      {filtered.map(c => <div key={c.id}>{c.nombre}</div>)}
    </div>
  )
}
```

---

## 🎨 PRIMERA PÁGINA FUNCIONAL (45 minutos)

### Paso 1: Crear Layout Básico

```typescript
// src/app/layout.tsx

import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ContratoMate Mini',
  description: 'Sistema de gestión de contratos',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
```

### Paso 2: Página de Inicio Simple

```typescript
// src/app/page.tsx

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            ContratoMate Mini
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-gray-600">
            Sistema de gestión de contratos
          </p>
          
          <Link href="/login">
            <Button className="w-full" size="lg">
              Iniciar Sesión
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
```

**✅ Checkpoint:** 
- Ir a http://localhost:3000
- Debes ver una tarjeta con título y botón
- El botón debe verse estilizado (gracias a Shadcn)

### Paso 3: Página de Login (sin funcionalidad aún)

```typescript
// src/app/(auth)/login/page.tsx

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Iniciar Sesión</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="tu@email.com"
                required
              />
            </div>

            <div>
              <Label htmlFor="password">Contraseña</Label>
              <Input 
                id="password" 
                type="password"
                required
              />
            </div>

            <Button type="submit" className="w-full">
              Entrar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
```

**✅ Checkpoint:**
- Ir a http://localhost:3000/login
- Debes ver formulario de login
- Los campos deben verse bien (gracias a Shadcn)

**🎉 Día 1 Completado! Ya tienes:**
- ✅ Proyecto Next.js funcionando
- ✅ Shadcn UI configurado
- ✅ 2 páginas básicas
- ✅ Entiendes Server Components

---

## 🗄️ PARTE 2: SETUP SUPABASE (45 minutos)

### Paso 1: Crear Proyecto en Supabase

```bash
1. Ir a https://supabase.com
2. Sign Up (con GitHub es más rápido)
3. New Project
   - Name: contratomate-mini
   - Database Password: [GUARDA ESTO]
   - Region: South America (más cercano)
4. Esperar 2 minutos (mientras crea el proyecto)
```

### Paso 2: Obtener Credenciales

```bash
1. En Supabase Dashboard:
   Settings → API

2. Copiar:
   - Project URL
   - anon/public key

3. Crear archivo .env.local en la raíz del proyecto
```

```bash
# .env.local

NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3M...
```

**⚠️ IMPORTANTE:** 
- Reinicia el servidor después de crear .env.local
- Presiona Ctrl+C y luego `npm run dev`

### Paso 3: Configurar Clientes Supabase

```typescript
// src/lib/supabase/client.ts (para Client Components)

import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

```typescript
// src/lib/supabase/server.ts (para Server Components)

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createClient() {
  const cookieStore = cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )
}
```

---

## 📊 CREAR TABLAS (30 minutos)

### Paso 1: Crear Tabla de Contratistas

```sql
-- En Supabase Dashboard:
-- SQL Editor → New Query

-- Tabla contractors
CREATE TABLE contractors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tipo_persona TEXT NOT NULL CHECK (tipo_persona IN ('NATURAL', 'JURIDICA')),
  numero_identificacion TEXT NOT NULL UNIQUE,
  nombre_completo TEXT NOT NULL,
  email TEXT,
  telefono TEXT,
  ciudad TEXT,
  activo BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insertar datos de prueba
INSERT INTO contractors (tipo_persona, numero_identificacion, nombre_completo, email, ciudad) VALUES
('NATURAL', '123456789', 'Juan Pérez García', 'juan@example.com', 'Sincelejo'),
('JURIDICA', '900123456', 'Suministros S.A.S.', 'info@suministros.com', 'Sincelejo'),
('NATURAL', '987654321', 'María González', 'maria@example.com', 'Montería');
```

### Paso 2: Crear Tabla de Contratos

```sql
-- Tabla contracts
CREATE TABLE contracts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vigencia INTEGER NOT NULL,
  numero_proceso TEXT NOT NULL UNIQUE,
  objeto TEXT NOT NULL,
  
  -- Económico
  valor_contrato BIGINT NOT NULL,
  valor_contrato_letras TEXT,
  tiene_iva BOOLEAN DEFAULT false,
  porcentaje_iva NUMERIC(5,2) DEFAULT 0,
  valor_antes_iva BIGINT,
  valor_iva BIGINT,
  
  -- Relaciones
  contractor_id UUID REFERENCES contractors(id),
  
  estado TEXT DEFAULT 'BORRADOR',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insertar contrato de prueba
INSERT INTO contracts (
  vigencia, 
  numero_proceso, 
  objeto, 
  valor_contrato, 
  tiene_iva,
  contractor_id
) VALUES (
  2024,
  '2024-001',
  'Suministro de materiales de oficina',
  10000000,
  true,
  (SELECT id FROM contractors WHERE numero_identificacion = '123456789')
);
```

**✅ Checkpoint:**
- En Supabase: Table Editor
- Debes ver 2 tablas: contractors (3 filas) y contracts (1 fila)

---

## 📖 LEER DATOS - SERVER COMPONENT (30 minutos)

### Concepto: Server Components acceden BD directamente

```typescript
// ========== EJEMPLO EDUCATIVO ==========
// Server Component puede hacer queries DIRECTAS

export default async function Page() {
  // 1. Crear cliente
  const supabase = createClient()
  
  // 2. Query DIRECTO (sin API, sin fetch)
  const { data } = await supabase.from('contractors').select('*')
  
  // 3. Renderizar
  return <div>{JSON.stringify(data)}</div>
}
```

### Paso 1: Página de Contratistas (Server Component)

```typescript
// src/app/(dashboard)/contratistas/page.tsx

import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export default async function ContractorsPage() {
  // ✅ Server Component - Query DIRECTO
  const supabase = createClient()
  const { data: contractors } = await supabase
    .from('contractors')
    .select('*')
    .eq('activo', true)
    .order('created_at', { ascending: false })

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Contratistas</h1>
          <p className="text-gray-600">
            Total: {contractors?.length || 0}
          </p>
        </div>
        
        <Link href="/contratistas/nuevo">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Contratista
          </Button>
        </Link>
      </div>

      {/* Por ahora solo mostramos JSON */}
      <pre className="bg-gray-100 p-4 rounded overflow-auto">
        {JSON.stringify(contractors, null, 2)}
      </pre>
    </div>
  )
}
```

**✅ Checkpoint:**
- Ir a http://localhost:3000/contratistas
- Debes ver los 3 contratistas en formato JSON

### Paso 2: Crear Layout del Dashboard

```typescript
// src/app/(dashboard)/layout.tsx

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Users, FileText, LayoutDashboard } from 'lucide-react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r">
        <div className="p-6">
          <h2 className="text-xl font-bold text-blue-600">ContratoMate</h2>
        </div>
        
        <nav className="px-4 space-y-1">
          <Link href="/dashboard">
            <Button variant="ghost" className="w-full justify-start">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
          </Link>
          
          <Link href="/contratistas">
            <Button variant="ghost" className="w-full justify-start">
              <Users className="mr-2 h-4 w-4" />
              Contratistas
            </Button>
          </Link>
          
          <Link href="/contratos">
            <Button variant="ghost" className="w-full justify-start">
              <FileText className="mr-2 h-4 w-4" />
              Contratos
            </Button>
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-gray-50">
        {children}
      </div>
    </div>
  )
}
```

**✅ Checkpoint:**
- Recargar /contratistas
- Debes ver sidebar azul a la izquierda
- 3 botones de navegación

---

## 📊 MOSTRAR EN TABLA (45 minutos)

### Paso 1: Componente de Tabla (Client Component)

**¿Por qué Client? Porque tendrá botones con onClick**

```typescript
// src/app/(dashboard)/contratistas/ContractorsList.tsx

'use client'  // ← Client porque tiene interactividad

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Edit, Trash2 } from 'lucide-react'

interface Contractor {
  id: string
  tipo_persona: string
  numero_identificacion: string
  nombre_completo: string
  email: string | null
  ciudad: string | null
}

interface Props {
  contractors: Contractor[]
}

export default function ContractorsList({ contractors }: Props) {
  const handleDelete = (id: string) => {
    // Por ahora solo un alert
    alert(`Eliminar contratista: ${id}`)
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tipo</TableHead>
            <TableHead>Identificación</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Ciudad</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contractors.map((contractor) => (
            <TableRow key={contractor.id}>
              <TableCell>
                <Badge 
                  variant={contractor.tipo_persona === 'NATURAL' ? 'default' : 'secondary'}
                >
                  {contractor.tipo_persona}
                </Badge>
              </TableCell>
              <TableCell className="font-mono text-sm">
                {contractor.numero_identificacion}
              </TableCell>
              <TableCell className="font-medium">
                {contractor.nombre_completo}
              </TableCell>
              <TableCell>{contractor.email || '-'}</TableCell>
              <TableCell>{contractor.ciudad || '-'}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleDelete(contractor.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
```

### Paso 2: Actualizar Página para Usar la Tabla

```typescript
// src/app/(dashboard)/contratistas/page.tsx

import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import ContractorsList from './ContractorsList'  // ← Importar

export default async function ContractorsPage() {
  const supabase = createClient()
  const { data: contractors } = await supabase
    .from('contractors')
    .select('*')
    .eq('activo', true)
    .order('created_at', { ascending: false })

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Contratistas</h1>
          <p className="text-gray-600">
            Total: {contractors?.length || 0}
          </p>
        </div>
        
        <Link href="/contratistas/nuevo">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Contratista
          </Button>
        </Link>
      </div>

      {/* ✅ Usar componente de tabla */}
      <ContractorsList contractors={contractors || []} />
    </div>
  )
}
```

**✅ Checkpoint:**
- Recargar /contratistas
- Debes ver tabla profesional con 3 contratistas
- Badges de colores según tipo
- Botones de editar y eliminar
- Click en eliminar muestra alert

**🎓 Aprendizaje:**
- Server Component (page.tsx) carga datos
- Client Component (ContractorsList.tsx) muestra + interactividad
- Este es el patrón más común en Next.js

---

---

## 🔐 PARTE 3: AUTENTICACIÓN (1-2 horas)

### Paso 9: Configurar Auth en Supabase

```bash
# En Supabase Dashboard:
1. Authentication → Providers
2. Email: Ya está habilitado ✅
3. Configurar Email Templates (opcional)
```

### Paso 10: Crear Usuario de Prueba

```bash
# Opción 1: Desde Supabase Studio
1. Authentication → Users → Add User
2. Email: admin@test.com
3. Password: admin123
4. Auto Confirm User: ✅

# Opción 2: SQL
```

```sql
-- En SQL Editor
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  confirmation_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@test.com',
  crypt('admin123', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  ''
);
```

### Paso 11: Login Funcional (Client Component)

**¿Por qué Client? Porque tiene formulario interactivo**

```typescript
// src/app/(auth)/login/page.tsx

'use client'  // ← Client porque tiene useState y eventos

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const supabase = createClient()
      
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setError(error.message)
      } else {
        // ✅ Login exitoso
        router.push('/dashboard')
        router.refresh()  // Recargar para actualizar auth
      }
    } catch (err) {
      setError('Error al iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Iniciar Sesión</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded text-sm">
                {error}
              </div>
            )}

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@test.com"
                required
              />
            </div>

            <div>
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="admin123"
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Cargando...' : 'Entrar'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
```

**✅ Checkpoint:**
- Ir a http://localhost:3000/login
- Ingresar: admin@test.com / admin123
- Debe redirigir a /dashboard
- Si ingresas mal, debe mostrar error

### Paso 12: Middleware para Proteger Rutas

```typescript
// src/middleware.ts (en la raíz del proyecto, NO en src/)

import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options) {
          request.cookies.set({ name, value, ...options })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options) {
          request.cookies.set({ name, value: '', ...options })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  // Si no está autenticado y trata de acceder al dashboard
  if (!user && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (!user && request.nextUrl.pathname.startsWith('/contratistas')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (!user && request.nextUrl.pathname.startsWith('/contratos')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Si está autenticado y trata de ir a login
  if (user && request.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return response
}

export const config = {
  matcher: ['/dashboard/:path*', '/contratistas/:path*', '/contratos/:path*', '/login'],
}
```

**✅ Checkpoint:**
- Cerrar sesión (borrar cookies del browser o modo incógnito)
- Ir a http://localhost:3000/contratistas
- Debe redirigir a /login
- Hacer login
- Ahora sí debe ver /contratistas

### Paso 13: Botón de Logout

```typescript
// src/app/(dashboard)/layout.tsx

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Users, FileText, LayoutDashboard, LogOut } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import LogoutButton from './LogoutButton'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // ✅ Server Component - obtener usuario
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r flex flex-col">
        <div className="p-6">
          <h2 className="text-xl font-bold text-blue-600">ContratoMate</h2>
          <p className="text-xs text-gray-500">{user?.email}</p>
        </div>
        
        <nav className="px-4 space-y-1 flex-1">
          <Link href="/dashboard">
            <Button variant="ghost" className="w-full justify-start">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
          </Link>
          
          <Link href="/contratistas">
            <Button variant="ghost" className="w-full justify-start">
              <Users className="mr-2 h-4 w-4" />
              Contratistas
            </Button>
          </Link>
          
          <Link href="/contratos">
            <Button variant="ghost" className="w-full justify-start">
              <FileText className="mr-2 h-4 w-4" />
              Contratos
            </Button>
          </Link>
        </nav>

        {/* Logout al final */}
        <div className="p-4 border-t">
          <LogoutButton />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-gray-50">
        {children}
      </div>
    </div>
  )
}
```

```typescript
// src/app/(dashboard)/LogoutButton.tsx

'use client'  // ← Client porque tiene onClick

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <Button 
      variant="ghost" 
      className="w-full justify-start text-red-600"
      onClick={handleLogout}
    >
      <LogOut className="mr-2 h-4 w-4" />
      Cerrar Sesión
    </Button>
  )
}
```

**✅ Checkpoint:**
- Ver sidebar con email del usuario
- Click en "Cerrar Sesión"
- Debe redirigir a /login

**🎉 Auth Completado! Ya tienes:**
- ✅ Login funcional
- ✅ Rutas protegidas
- ✅ Logout funcional

---

## ⚡ PARTE 4: SERVER ACTIONS - CRUD (2-3 horas)

### 🎓 Concepto: ¿Qué son Server Actions?

```typescript
// Server Actions = Funciones del servidor que llamas desde el cliente

// ========== SIN Server Actions (antes) ==========
// 1. Crear API endpoint
app.post('/api/contractors', async (req, res) => { ... })

// 2. Llamar desde cliente
fetch('/api/contractors', { method: 'POST', body: ... })

// ========== CON Server Actions (ahora) ==========
// 1. Crear función del servidor
'use server'
export async function createContractor(data) { ... }

// 2. Llamar DIRECTO desde cliente
await createContractor(data)  // ✨ Magia!
```

### Paso 14: Crear Server Actions

```typescript
// src/app/actions/contractors.ts

'use server'  // ← Marca TODO el archivo como servidor

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// ========== CREATE ==========
export async function createContractor(formData: FormData) {
  const supabase = createClient()

  // 1. Extraer datos del formulario
  const data = {
    tipo_persona: formData.get('tipo_persona') as string,
    numero_identificacion: formData.get('numero_identificacion') as string,
    nombre_completo: formData.get('nombre_completo') as string,
    email: formData.get('email') as string || null,
    telefono: formData.get('telefono') as string || null,
    ciudad: formData.get('ciudad') as string || null,
  }

  // 2. Insertar en BD
  const { error } = await supabase
    .from('contractors')
    .insert(data)

  if (error) {
    return { success: false, error: error.message }
  }

  // 3. Revalidar cache de la página
  revalidatePath('/contratistas')

  // 4. Redirigir
  redirect('/contratistas')
}

// ========== UPDATE ==========
export async function updateContractor(id: string, formData: FormData) {
  const supabase = createClient()

  const data = {
    tipo_persona: formData.get('tipo_persona') as string,
    numero_identificacion: formData.get('numero_identificacion') as string,
    nombre_completo: formData.get('nombre_completo') as string,
    email: formData.get('email') as string || null,
    telefono: formData.get('telefono') as string || null,
    ciudad: formData.get('ciudad') as string || null,
  }

  const { error } = await supabase
    .from('contractors')
    .update(data)
    .eq('id', id)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/contratistas')
  redirect('/contratistas')
}

// ========== DELETE (Soft Delete) ==========
export async function deleteContractor(id: string) {
  const supabase = createClient()

  const { error } = await supabase
    .from('contractors')
    .update({ activo: false })
    .eq('id', id)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/contratistas')
  return { success: true }
}

// ========== GET ONE ==========
export async function getContractor(id: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('contractors')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    return null
  }

  return data
}
```

**🎓 Aprendizaje:**
- `'use server'` al inicio = todo el archivo es servidor
- `revalidatePath()` = actualiza cache de Next.js
- `redirect()` = redirige después de la acción
- Retornar `{ success, error }` para manejo de errores

### Paso 15: Formulario de Crear Contratista

```typescript
// src/app/(dashboard)/contratistas/nuevo/page.tsx

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import ContractorForm from '../ContractorForm'

export default function NewContractorPage() {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Nuevo Contratista</CardTitle>
        </CardHeader>
        <CardContent>
          <ContractorForm />
        </CardContent>
      </Card>
    </div>
  )
}
```

```typescript
// src/app/(dashboard)/contratistas/ContractorForm.tsx

'use client'  // ← Client porque tiene useState

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createContractor } from '@/app/actions/contractors'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function ContractorForm() {
  const router = useRouter()
  const [tipoPersona, setTipoPersona] = useState('NATURAL')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    
    try {
      await createContractor(formData)
      // Si llega aquí, redirect() ya redirigió
    } catch (error) {
      alert('Error creando contratista')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Tipo de Persona */}
      <div>
        <Label htmlFor="tipo_persona">Tipo de Persona</Label>
        <Select
          name="tipo_persona"
          value={tipoPersona}
          onValueChange={setTipoPersona}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="NATURAL">Natural</SelectItem>
            <SelectItem value="JURIDICA">Jurídica</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Número de Identificación */}
      <div>
        <Label htmlFor="numero_identificacion">
          Número de Identificación
        </Label>
        <Input
          id="numero_identificacion"
          name="numero_identificacion"
          placeholder="123456789"
          required
        />
      </div>

      {/* Nombre Completo */}
      <div>
        <Label htmlFor="nombre_completo">
          {tipoPersona === 'NATURAL' ? 'Nombre Completo' : 'Razón Social'}
        </Label>
        <Input
          id="nombre_completo"
          name="nombre_completo"
          placeholder="Juan Pérez García"
          required
        />
      </div>

      {/* Email */}
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="ejemplo@email.com"
        />
      </div>

      {/* Teléfono */}
      <div>
        <Label htmlFor="telefono">Teléfono</Label>
        <Input
          id="telefono"
          name="telefono"
          placeholder="3001234567"
        />
      </div>

      {/* Ciudad */}
      <div>
        <Label htmlFor="ciudad">Ciudad</Label>
        <Input
          id="ciudad"
          name="ciudad"
          placeholder="Sincelejo"
        />
      </div>

      {/* Botones */}
      <div className="flex gap-2 justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={loading}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? 'Guardando...' : 'Guardar'}
        </Button>
      </div>
    </form>
  )
}
```

**✅ Checkpoint:**
- Ir a /contratistas
- Click "Nuevo Contratista"
- Llenar formulario
- Click "Guardar"
- Debe redirigir a /contratistas
- Debe aparecer el nuevo contratista en la tabla

**🎓 Aprendizaje:**
- Server Action (`createContractor`) se llama como función normal
- FormData se pasa automáticamente
- No necesitas `fetch()` ni crear API endpoint

### Paso 16: Eliminar con Server Action

```typescript
// src/app/(dashboard)/contratistas/ContractorsList.tsx

'use client'

import { deleteContractor } from '@/app/actions/contractors'  // ← Importar
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Edit, Trash2 } from 'lucide-react'
import { useState } from 'react'

interface Contractor {
  id: string
  tipo_persona: string
  numero_identificacion: string
  nombre_completo: string
  email: string | null
  ciudad: string | null
}

interface Props {
  contractors: Contractor[]
}

export default function ContractorsList({ contractors }: Props) {
  const [deleting, setDeleting] = useState<string | null>(null)

  const handleDelete = async (id: string, nombre: string) => {
    if (!confirm(`¿Eliminar a ${nombre}?`)) return

    setDeleting(id)

    try {
      const result = await deleteContractor(id)  // ← Llamar Server Action
      
      if (!result.success) {
        alert('Error eliminando contratista')
      }
    } catch (error) {
      alert('Error eliminando contratista')
    } finally {
      setDeleting(null)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tipo</TableHead>
            <TableHead>Identificación</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Ciudad</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contractors.map((contractor) => (
            <TableRow key={contractor.id}>
              <TableCell>
                <Badge 
                  variant={contractor.tipo_persona === 'NATURAL' ? 'default' : 'secondary'}
                >
                  {contractor.tipo_persona}
                </Badge>
              </TableCell>
              <TableCell className="font-mono text-sm">
                {contractor.numero_identificacion}
              </TableCell>
              <TableCell className="font-medium">
                {contractor.nombre_completo}
              </TableCell>
              <TableCell>{contractor.email || '-'}</TableCell>
              <TableCell>{contractor.ciudad || '-'}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleDelete(contractor.id, contractor.nombre_completo)}
                    disabled={deleting === contractor.id}
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
```

**✅ Checkpoint:**
- Ir a /contratistas
- Click en icono de eliminar
- Confirmar
- El contratista debe desaparecer de la tabla

**🎓 Aprendizaje:**
- Server Actions se pueden llamar desde `onClick`
- `revalidatePath()` actualiza la página automáticamente
- No necesitas refrescar manualmente

**🎉 CRUD Completado! Ya tienes:**
- ✅ Listar (Server Component)
- ✅ Crear (Server Action + Formulario)
- ✅ Eliminar (Server Action + onClick)

---

## 💰 PARTE 5: FORMULARIO DE CONTRATO CON CÁLCULO IVA (2 horas)

### Paso 17: Crear Server Actions para Contratos

```typescript
// src/app/actions/contracts.ts

'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// Función helper para convertir números a letras (simple)
function numberToWords(num: number): string {
  // Implementación simple - en producción usa librería
  return `${num.toLocaleString('es-CO')} PESOS`
}

export async function createContract(formData: FormData) {
  const supabase = createClient()

  // Extraer y calcular valores
  const valor_contrato = parseInt(formData.get('valor_contrato') as string)
  const tiene_iva = formData.get('tiene_iva') === 'true'
  const porcentaje_iva = parseFloat(formData.get('porcentaje_iva') as string || '0')

  let valor_antes_iva = valor_contrato
  let valor_iva = 0

  if (tiene_iva) {
    // Calcular IVA desde el total
    const divisor = 1 + (porcentaje_iva / 100)
    valor_antes_iva = Math.round(valor_contrato / divisor)
    valor_iva = valor_contrato - valor_antes_iva
  }

  const data = {
    vigencia: parseInt(formData.get('vigencia') as string),
    numero_proceso: formData.get('numero_proceso') as string,
    objeto: formData.get('objeto') as string,
    valor_contrato,
    valor_contrato_letras: numberToWords(valor_contrato),
    tiene_iva,
    porcentaje_iva: tiene_iva ? porcentaje_iva : 0,
    valor_antes_iva: tiene_iva ? valor_antes_iva : null,
    valor_iva: tiene_iva ? valor_iva : null,
    contractor_id: formData.get('contractor_id') as string || null,
    estado: 'BORRADOR',
  }

  const { error } = await supabase
    .from('contracts')
    .insert(data)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/contratos')
  redirect('/contratos')
}
```

### Paso 18: Formulario de Contrato con Cálculo en Tiempo Real

```typescript
// src/app/(dashboard)/contratos/nuevo/page.tsx

import { createClient } from '@/lib/supabase/server'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import ContractForm from '../ContractForm'

export default async function NewContractPage() {
  // Cargar contratistas para el select
  const supabase = createClient()
  const { data: contractors } = await supabase
    .from('contractors')
    .select('id, nombre_completo')
    .eq('activo', true)
    .order('nombre_completo')

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Nuevo Contrato</CardTitle>
        </CardHeader>
        <CardContent>
          <ContractForm contractors={contractors || []} />
        </CardContent>
      </Card>
    </div>
  )
}
```

```typescript
// src/app/(dashboard)/contratos/ContractForm.tsx

'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createContract } from '@/app/actions/contracts'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface Props {
  contractors: Array<{ id: string; nombre_completo: string }>
}

export default function ContractForm({ contractors }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  // Estados para cálculo de IVA
  const [valorContrato, setValorContrato] = useState(0)
  const [tieneIva, setTieneIva] = useState(false)
  const [porcentajeIva, setPorcentajeIva] = useState(19)

  // Cálculos automáticos
  const [valorAntes, setValorAntes] = useState(0)
  const [valorIva, setValorIva] = useState(0)

  // ✨ Calcular IVA en tiempo real
  useEffect(() => {
    if (tieneIva && valorContrato > 0) {
      const divisor = 1 + (porcentajeIva / 100)
      const antes = Math.round(valorContrato / divisor)
      const iva = valorContrato - antes

      setValorAntes(antes)
      setValorIva(iva)
    } else {
      setValorAntes(0)
      setValorIva(0)
    }
  }, [valorContrato, tieneIva, porcentajeIva])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    
    try {
      await createContract(formData)
    } catch (error) {
      alert('Error creando contrato')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Información General */}
      <div className="space-y-4">
        <h3 className="font-medium">Información General</h3>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="vigencia">Vigencia</Label>
            <Input
              id="vigencia"
              name="vigencia"
              type="number"
              defaultValue={new Date().getFullYear()}
              required
            />
          </div>

          <div>
            <Label htmlFor="numero_proceso">Número de Proceso</Label>
            <Input
              id="numero_proceso"
              name="numero_proceso"
              placeholder="2024-001"
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="objeto">Objeto del Contrato</Label>
          <Textarea
            id="objeto"
            name="objeto"
            placeholder="Descripción detallada del objeto contractual..."
            rows={3}
            required
          />
        </div>

        <div>
          <Label htmlFor="contractor_id">Contratista</Label>
          <Select name="contractor_id">
            <SelectTrigger>
              <SelectValue placeholder="Seleccione un contratista" />
            </SelectTrigger>
            <SelectContent>
              {contractors.map((contractor) => (
                <SelectItem key={contractor.id} value={contractor.id}>
                  {contractor.nombre_completo}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Información Económica */}
      <div className="space-y-4">
        <h3 className="font-medium">Información Económica</h3>

        <div>
          <Label htmlFor="valor_contrato">Valor del Contrato</Label>
          <Input
            id="valor_contrato"
            name="valor_contrato"
            type="number"
            value={valorContrato || ''}
            onChange={(e) => setValorContrato(parseInt(e.target.value) || 0)}
            placeholder="10000000"
            required
          />
          {valorContrato > 0 && (
            <p className="text-sm text-blue-600 mt-1">
              💰 ${valorContrato.toLocaleString('es-CO')}
            </p>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="tiene_iva"
            name="tiene_iva"
            value="true"
            checked={tieneIva}
            onCheckedChange={(checked) => setTieneIva(checked as boolean)}
          />
          <Label htmlFor="tiene_iva" className="cursor-pointer">
            Incluye IVA
          </Label>
        </div>

        {tieneIva && (
          <>
            <div>
              <Label htmlFor="porcentaje_iva">Porcentaje IVA (%)</Label>
              <Input
                id="porcentaje_iva"
                name="porcentaje_iva"
                type="number"
                value={porcentajeIva}
                onChange={(e) => setPorcentajeIva(parseFloat(e.target.value) || 19)}
                step="0.01"
              />
            </div>

            {/* ✨ Desglose Automático */}
            <div className="bg-blue-50 p-4 rounded-lg space-y-2">
              <h4 className="font-medium text-blue-900">💰 Desglose Automático</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-mono font-medium">
                    ${valorAntes.toLocaleString('es-CO')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>IVA ({porcentajeIva}%):</span>
                  <span className="font-mono font-medium">
                    ${valorIva.toLocaleString('es-CO')}
                  </span>
                </div>
                <div className="flex justify-between border-t pt-1 font-bold">
                  <span>Total:</span>
                  <span className="font-mono">
                    ${valorContrato.toLocaleString('es-CO')}
                  </span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Botones */}
      <div className="flex gap-2 justify-end pt-4 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={loading}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? 'Guardando...' : 'Crear Contrato'}
        </Button>
      </div>
    </form>
  )
}
```

**✅ Checkpoint:**
- Ir a /contratos
- Click "Nuevo Contrato"
- Ingresar valor: 10000000
- Activar "Incluye IVA"
- **Debe mostrar desglose en tiempo real:**
  - Subtotal: $8,403,361
  - IVA (19%): $1,596,639
  - Total: $10,000,000
- Guardar
- Debe redirigir a /contratos

**🎓 Aprendizaje Clave:**
- `useEffect` calcula automáticamente cuando cambian los valores
- Client Component maneja la interactividad
- Server Action procesa y guarda

---

## 📊 PARTE 6: LISTADO DE CONTRATOS (1 hora)

### Paso 19: Página de Contratos con Filtros

```typescript
// src/app/(dashboard)/contratos/page.tsx

import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import ContractsList from './ContractsList'
import ContractsFilters from './ContractsFilters'

interface Props {
  searchParams: {
    vigencia?: string
    estado?: string
  }
}

export default async function ContractsPage({ searchParams }: Props) {
  const supabase = createClient()

  // Construir query dinámicamente
  let query = supabase
    .from('contracts')
    .select(`
      *,
      contractor:contractors(nombre_completo)
    `)

  // Aplicar filtros
  if (searchParams.vigencia) {
    query = query.eq('vigencia', parseInt(searchParams.vigencia))
  }

  if (searchParams.estado) {
    query = query.eq('estado', searchParams.estado)
  }

  const { data: contracts } = await query.order('created_at', { ascending: false })

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Contratos</h1>
          <p className="text-gray-600">
            Total: {contracts?.length || 0}
          </p>
        </div>
        
        <Link href="/contratos/nuevo">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Contrato
          </Button>
        </Link>
      </div>

      <ContractsFilters />

      <ContractsList contracts={contracts || []} />
    </div>
  )
}
```

```typescript
// src/app/(dashboard)/contratos/ContractsFilters.tsx

'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function ContractsFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams)
    
    if (value && value !== 'all') {
      params.set(key, value)
    } else {
      params.delete(key)
    }

    router.push(`/contratos?${params.toString()}`)
  }

  return (
    <div className="flex gap-4 bg-white p-4 rounded-lg shadow">
      <div className="w-48">
        <Select
          value={searchParams.get('vigencia') || 'all'}
          onValueChange={(value) => updateFilter('vigencia', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Vigencia" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            <SelectItem value="2024">2024</SelectItem>
            <SelectItem value="2023">2023</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="w-48">
        <Select
          value={searchParams.get('estado') || 'all'}
          onValueChange={(value) => updateFilter('estado', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="BORRADOR">Borrador</SelectItem>
            <SelectItem value="ACTIVO">Activo</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
```

```typescript
// src/app/(dashboard)/contratos/ContractsList.tsx

'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

interface Contract {
  id: string
  numero_proceso: string
  objeto: string
  valor_contrato: number
  vigencia: number
  estado: string
  contractor: { nombre_completo: string } | null
}

interface Props {
  contracts: Contract[]
}

export default function ContractsList({ contracts }: Props) {
  return (
    <div className="bg-white rounded-lg shadow">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Proceso</TableHead>
            <TableHead>Objeto</TableHead>
            <TableHead>Contratista</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Vigencia</TableHead>
            <TableHead>Estado</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contracts.map((contract) => (
            <TableRow key={contract.id}>
              <TableCell className="font-mono">
                {contract.numero_proceso}
              </TableCell>
              <TableCell className="max-w-xs truncate">
                {contract.objeto}
              </TableCell>
              <TableCell>
                {contract.contractor?.nombre_completo || '-'}
              </TableCell>
              <TableCell className="font-mono">
                ${contract.valor_contrato.toLocaleString('es-CO')}
              </TableCell>
              <TableCell>{contract.vigencia}</TableCell>
              <TableCell>
                <Badge variant={contract.estado === 'ACTIVO' ? 'default' : 'secondary'}>
                  {contract.estado}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
```

**✅ Checkpoint:**
- Ir a /contratos
- Ver tabla con contratos
- Probar filtros de vigencia y estado
- URL debe cambiar: /contratos?vigencia=2024

**🎓 Aprendizaje:**
- `searchParams` se pasa automáticamente a Server Components
- Filtros cambian la URL
- Server Component re-ejecuta con nuevos filtros

---

## 📄 PARTE 7: API ROUTE - GENERAR WORD (1-2 horas)

### Paso 20: Instalar Dependencia

```bash
npm install docxtemplater pizzip
```

### Paso 21: Crear Plantilla Word Simple

```bash
# Crear carpeta
mkdir -p public/templates

# Crear archivo Word:
# 1. Abrir Microsoft Word
# 2. Escribir este contenido:
```

```
CONTRATO No. <<NUMERO_PROCESO>>

OBJETO: <<OBJETO>>

VALOR: <<VALOR_CONTRATO>>

CONTRATISTA: <<CONTRATISTA>>

VIGENCIA: <<VIGENCIA>>
```

```bash
# 3. Guardar como: public/templates/CONTRATO.docx
```

### Paso 22: API Route para Generar

```typescript
// src/app/api/documents/generate/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import Docxtemplater from 'docxtemplater'
import PizZip from 'pizzip'
import fs from 'fs'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const { contractId } = await request.json()

    // 1. Obtener datos del contrato
    const supabase = createClient()
    const { data: contract } = await supabase
      .from('contracts')
      .select(`
        *,
        contractor:contractors(nombre_completo)
      `)
      .eq('id', contractId)
      .single()

    if (!contract) {
      return NextResponse.json(
        { error: 'Contrato no encontrado' },
        { status: 404 }
      )
    }

    // 2. Leer plantilla
    const templatePath = path.join(process.cwd(), 'public', 'templates', 'CONTRATO.docx')
    const content = fs.readFileSync(templatePath, 'binary')

    // 3. Generar documento
    const zip = new PizZip(content)
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
      delimiters: { start: '<<', end: '>>' }
    })

    // 4. Renderizar con datos
    doc.render({
      NUMERO_PROCESO: contract.numero_proceso,
      OBJETO: contract.objeto,
      VALOR_CONTRATO: `$${contract.valor_contrato.toLocaleString('es-CO')}`,
      CONTRATISTA: contract.contractor?.nombre_completo || 'N/A',
      VIGENCIA: contract.vigencia.toString()
    })

    // 5. Generar buffer
    const buffer = doc.getZip().generate({
      type: 'nodebuffer',
      compression: 'DEFLATE'
    })

    // 6. Retornar como descarga
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': `attachment; filename="Contrato_${contract.numero_proceso}.docx"`
      }
    })

  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Error generando documento' },
      { status: 500 }
    )
  }
}
```

### Paso 23: Botón para Generar

```typescript
// src/app/(dashboard)/contratos/ContractsList.tsx

'use client'

import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { FileText } from 'lucide-react'

interface Contract {
  id: string
  numero_proceso: string
  objeto: string
  valor_contrato: number
  vigencia: number
  estado: string
  contractor: { nombre_completo: string } | null
}

interface Props {
  contracts: Contract[]
}

export default function ContractsList({ contracts }: Props) {
  const [generating, setGenerating] = useState<string | null>(null)

  const handleGenerate = async (contractId: string, numeroProceso: string) => {
    setGenerating(contractId)

    try {
      const res = await fetch('/api/documents/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contractId })
      })

      if (res.ok) {
        // Descargar archivo
        const blob = await res.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `Contrato_${numeroProceso}.docx`
        document.body.appendChild(a)
        a.click()
        a.remove()
        window.URL.revokeObjectURL(url)
      } else {
        alert('Error generando documento')
      }
    } catch (error) {
      alert('Error generando documento')
    } finally {
      setGenerating(null)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Proceso</TableHead>
            <TableHead>Objeto</TableHead>
            <TableHead>Contratista</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Vigencia</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contracts.map((contract) => (
            <TableRow key={contract.id}>
              <TableCell className="font-mono">
                {contract.numero_proceso}
              </TableCell>
              <TableCell className="max-w-xs truncate">
                {contract.objeto}
              </TableCell>
              <TableCell>
                {contract.contractor?.nombre_completo || '-'}
              </TableCell>
              <TableCell className="font-mono">
                ${contract.valor_contrato.toLocaleString('es-CO')}
              </TableCell>
              <TableCell>{contract.vigencia}</TableCell>
              <TableCell>
                <Badge variant={contract.estado === 'ACTIVO' ? 'default' : 'secondary'}>
                  {contract.estado}
                </Badge>
              </TableCell>
              <TableCell>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleGenerate(contract.id, contract.numero_proceso)}
                  disabled={generating === contract.id}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  {generating === contract.id ? 'Generando...' : 'Generar Word'}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
```

**✅ Checkpoint:**
- Ir a /contratos
- Click "Generar Word" en cualquier contrato
- Debe descargar archivo .docx
- Abrir en Word y verificar que las variables fueron reemplazadas

**🎓 Aprendizaje:**
- API Routes se usan para lógica pesada
- `fetch()` desde cliente a API Route
- Retornar archivo como descarga

---

## 📊 PARTE 8: DASHBOARD (1 hora)

### Paso 24: Dashboard con Estadísticas

```typescript
// src/app/(dashboard)/page.tsx

import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, FileText, DollarSign } from 'lucide-react'

export default async function DashboardPage() {
  const supabase = createClient()

  // Contar contratistas
  const { count: totalContractors } = await supabase
    .from('contractors')
    .select('*', { count: 'exact', head: true })
    .eq('activo', true)

  // Contar contratos
  const { count: totalContracts } = await supabase
    .from('contracts')
    .select('*', { count: 'exact', head: true })

  // Sumar valor total
  const { data: contracts } = await supabase
    .from('contracts')
    .select('valor_contrato')

  const totalValue = contracts?.reduce((sum, c) => sum + c.valor_contrato, 0) || 0

  // Últimos contratos
  const { data: recentContracts } = await supabase
    .from('contracts')
    .select(`
      *,
      contractor:contractors(nombre_completo)
    `)
    .order('created_at', { ascending: false })
    .limit(5)

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Contratistas
            </CardTitle>
            <Users className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalContractors}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Contratos
            </CardTitle>
            <FileText className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalContracts}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Valor Total
            </CardTitle>
            <DollarSign className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalValue.toLocaleString('es-CO')}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Últimos Contratos */}
      <Card>
        <CardHeader>
          <CardTitle>Últimos Contratos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentContracts?.map((contract) => (
              <div
                key={contract.id}
                className="flex items-center justify-between border-b pb-4 last:border-0"
              >
                <div>
                  <p className="font-medium">{contract.numero_proceso}</p>
                  <p className="text-sm text-gray-600 truncate max-w-md">
                    {contract.objeto}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-mono">
                    ${contract.valor_contrato.toLocaleString('es-CO')}
                  </p>
                  <p className="text-sm text-gray-600">
                    {contract.contractor?.nombre_completo || 'Sin contratista'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
```

**✅ Checkpoint Final:**
- Ir a /dashboard
- Ver 3 tarjetas con estadísticas
- Ver lista de últimos 5 contratos

---

## 🎉 ¡TUTORIAL COMPLETADO!

### 🏆 Lo que aprendiste:

✅ **Server Components** - Cargar datos directamente  
✅ **Client Components** - Interactividad (useState, onClick)  
✅ **Server Actions** - Crear/Actualizar/Eliminar sin API  
✅ **API Routes** - Lógica compleja (generar Word)  
✅ **Supabase** - Base de datos + Auth  
✅ **Formularios** - React Hook Form + validación  
✅ **Cálculos en tiempo real** - useEffect  
✅ **Navegación** - Next.js Router  
✅ **Middleware** - Proteger rutas  

### 📋 Checklist Final de Funcionalidades:

- [x] Login/Logout funcional
- [x] Rutas protegidas
- [x] Listar contratistas
- [x] Crear contratista
- [x] Eliminar contratista
- [x] Listar contratos
- [x] Crear contrato con cálculo IVA
- [x] Filtros dinámicos
- [x] Generar documento Word
- [x] Dashboard con stats

### 🚀 Siguientes Pasos:

**Para el proyecto completo:**
1. Agregar más campos a los formularios
2. Implementar cronograma interactivo
3. Múltiples plantillas de documentos
4. Módulo de firmas digitales
5. Sistema de permisos por roles

**Para practicar más:**
1. Agregar editar contratista
2. Ver detalle de contrato
3. Búsqueda en tiempo real
4. Exportar a Excel
5. Generar PDF

---

## 📚 RESUMEN DE PATRONES

### Cuándo usar cada cosa:

```typescript
// ========== MOSTRAR DATOS ==========
Server Component (async function)

// ========== INTERACTIVIDAD ==========
Client Component ('use client')

// ========== CREAR/EDITAR/ELIMINAR ==========
Server Actions ('use server')

// ========== LÓGICA PESADA ==========
API Routes (app/api/*/route.ts)
```

### Arquitectura que construiste:

```
Next.js App
├── Server Components (carga datos)
├── Client Components (UI interactiva)
├── Server Actions (mutaciones)
├── API Routes (lógica compleja)
└── Supabase (BD + Auth)
```

---

**¡Felicitaciones! Ya dominas Next.js 14 + React 19** 🎓

Ahora estás listo para construir el proyecto completo de ContratoMate.

---

## 🔧 DEBUGGING Y PROBLEMAS COMUNES

### Problema 1: "Cannot find module '@/...' "

**Síntoma:**
```
Error: Cannot find module '@/components/ui/button'
```

**Solución:**
```bash
# 1. Verificar que tsconfig.json tenga:
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}

# 2. Reiniciar servidor
# Ctrl+C
npm run dev
```

---

### Problema 2: "Hooks can only be called inside the body of a function component"

**Síntoma:**
```typescript
// Este código falla:
export default function Page() {
  const [state, setState] = useState()  // ❌ Error
  return <div>...</div>
}
```

**Causa:** Falta `'use client'`

**Solución:**
```typescript
'use client'  // ← Agregar esto

export default function Page() {
  const [state, setState] = useState()  // ✅ Funciona
  return <div>...</div>
}
```

---

### Problema 3: "Error: cookies() expects to have requestAsyncStorage"

**Síntoma:**
```
Error al usar createClient() from server
```

**Causa:** Estás usando el cliente del servidor en un Client Component

**Solución:**
```typescript
// ❌ MAL
'use client'
import { createClient } from '@/lib/supabase/server'  // ← Error

// ✅ BIEN
'use client'
import { createClient } from '@/lib/supabase/client'  // ← Correcto
```

**Regla:**
- Server Components → `@/lib/supabase/server`
- Client Components → `@/lib/supabase/client`

---

### Problema 4: Server Action no redirige

**Síntoma:**
```typescript
await createContractor(formData)
// No pasa nada, no redirige
```

**Solución:**
```typescript
// El redirect() debe estar DENTRO del Server Action
'use server'

export async function createContractor(formData: FormData) {
  // ... crear
  revalidatePath('/contratistas')
  redirect('/contratistas')  // ← Dentro de la función
}
```

---

## 🎯 EJERCICIOS ADICIONALES (Práctica)

### Ejercicio 1: Editar Contratista (Fácil)

**Pasos:**
1. Crear `src/app/(dashboard)/contratistas/[id]/editar/page.tsx`
2. Usar `getContractor(id)` para cargar datos
3. Reusar `ContractorForm` pero con valores iniciales
4. Crear `updateContractor()` Server Action

**Pista:**
```typescript
export default async function EditPage({ params }: { params: { id: string } }) {
  const contractor = await getContractor(params.id)
  return <ContractorForm initialData={contractor} />
}
```

---

### Ejercicio 2: Búsqueda en Tiempo Real (Medio)

**Objetivo:** Buscar contratistas mientras escribes

```typescript
'use client'
import { useState, useDeferredValue } from 'react'

export default function ContractorsList({ contractors }) {
  const [search, setSearch] = useState('')
  const deferredSearch = useDeferredValue(search)
  
  const filtered = contractors.filter(c =>
    c.nombre_completo.toLowerCase().includes(deferredSearch.toLowerCase())
  )
  
  return (
    <div>
      <Input value={search} onChange={e => setSearch(e.target.value)} />
      {/* render filtered */}
    </div>
  )
}
```

---

### Ejercicio 3: Validación con Zod (Difícil)

```bash
npm install zod
```

```typescript
// lib/schemas/contractor.schema.ts
import { z } from 'zod'

export const contractorSchema = z.object({
  tipo_persona: z.enum(['NATURAL', 'JURIDICA']),
  numero_identificacion: z.string().min(6, 'Mínimo 6 dígitos'),
  nombre_completo: z.string().min(3, 'Mínimo 3 caracteres'),
  email: z.string().email('Email inválido').optional().or(z.literal('')),
})
```

---

## 📦 OPTIMIZACIONES

### Loading States Globales

```typescript
// src/app/(dashboard)/loading.tsx

export default function Loading() {
  return (
    <div className="p-6">
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded w-1/4"></div>
        <div className="h-64 bg-gray-200 rounded"></div>
      </div>
    </div>
  )
}
```

---

### Error Boundaries

```typescript
// src/app/(dashboard)/error.tsx

'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div className="p-6">
      <div className="bg-red-50 p-4 rounded-lg">
        <h2 className="text-red-800 font-bold">¡Algo salió mal!</h2>
        <p className="text-red-600">{error.message}</p>
        <button onClick={reset} className="mt-4 px-4 py-2 bg-red-600 text-white rounded">
          Intentar de nuevo
        </button>
      </div>
    </div>
  )
}
```

---

## 🚀 MIGRAR A PRODUCCIÓN

### Deploy en Vercel (GRATIS)

```bash
# 1. Subir a GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/tu-usuario/contratomate-mini.git
git push -u origin main

# 2. Ir a vercel.com
# 3. New Project → Import from GitHub
# 4. Seleccionar repositorio
# 5. Configurar variables de entorno:
#    - NEXT_PUBLIC_SUPABASE_URL
#    - NEXT_PUBLIC_SUPABASE_ANON_KEY
# 6. Deploy

# ✅ En 2 minutos: https://contratomate-mini.vercel.app
```

---

## 📚 RECURSOS PARA SEGUIR APRENDIENDO

### Documentación Oficial

- **Next.js:** https://nextjs.org/docs
- **React:** https://react.dev
- **Supabase:** https://supabase.com/docs
- **Shadcn/UI:** https://ui.shadcn.com
- **Tailwind CSS:** https://tailwindcss.com/docs

### Comunidades

- **Discord de Next.js:** https://nextjs.org/discord
- **Discord de Supabase:** https://discord.supabase.com

---

## 🎊 CONCLUSIÓN

### Lo que lograste:

🎓 **Aprendiste Next.js 14** desde cero
- Server Components
- Client Components  
- Server Actions
- API Routes

🔥 **Construiste una app funcional**
- Auth completa
- CRUD completo
- Lógica de negocio real
- Generación de documentos

💪 **Dominaste el stack moderno**
- Next.js 14
- React 19
- Supabase
- TypeScript
- Tailwind CSS

### Próximos pasos:

1. **Practica los ejercicios** de esta guía
2. **Agrega funcionalidades** al MVP
3. **Lee la documentación** oficial
4. **Únete a comunidades** (Discord)
5. **Comparte tu proyecto** (GitHub)

---

## 🆘 AYUDA Y SOPORTE

### Si te atascas:

1. **Revisar esta guía** - Busca el error en "Debugging"
2. **Console del navegador** - F12 → Console
3. **Logs del servidor** - Ver terminal donde corre `npm run dev`
4. **Supabase Studio** - Verificar datos en la BD
5. **Discord de Next.js** - Hacer preguntas

---

## 📎 APÉNDICE: COMANDOS ÚTILES

### Comandos Next.js

```bash
npm run dev          # Inicia servidor de desarrollo
npm run build        # Crea build de producción
npm run start        # Inicia servidor de producción
npm run lint         # Verifica errores de código
npx tsc --noEmit     # Verifica tipos TypeScript
```

### Comandos Git

```bash
git init                    # Inicializar repositorio
git add .                   # Agregar todos los archivos
git commit -m "mensaje"     # Crear commit
git push origin main        # Subir a GitHub
git status                  # Ver estado
```

---

**¡Mucha suerte en tu viaje con Next.js! 🚀**

**FIN DEL TUTORIAL** 🎉
