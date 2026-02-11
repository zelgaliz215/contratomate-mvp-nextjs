# MVP Implementation Plan: ContratoMate Mini (Modernized)

This plan outlines the steps to build the ContratoMate Mini MVP, upgrading the original tutorial to a modern stack: **Next.js 15, Better Auth, Prisma ORM, Supabase (Postgres), and Shadcn/UI**.

## User Review Required

> [!IMPORTANT]
> **Authentication Architecture Change:**
> The original tutorial uses Supabase Auth + RLS (Row Level Security).
> We will use **Better Auth** with the **Prisma Adapter**, storing data in Supabase Postgres.
> **Implication:** Security logic moves from Database (RLS) to Application (Server Actions/Middleware). This is often easier to debug and more flexible for complex logic.

## Proposed Changes

### Phase 1: Setup & Foundation

#### [NEW] Project Initialization

- Initialize with `create-next-app@latest` (Next.js 15, React 19, Tailwind v4, TypeScript).
- Configure strict ESLint and Prettier.

#### [NEW] UI Component System

- Initialize `shadcn/ui`.
- Install core components: Button, Input, Card, Table, Dialog, Form, Sheet, Dropdown, Toast.
- Customize `globals.css` with a premium, vibrant palette (departing from default slate).

### Phase 2: Database & Auth (Supabase + Prisma)

#### [MODIFY] Supabase Setup

- Create Supabase project (same as tutorial).
- **Deviation:** We will NOT create tables in SQLEditor manually. We will use **Prisma Schema**.
- Get connection string (Transaction Mode for Prisma) from Supabase Settings.

#### [NEW] Prisma Setup

- Initialize Prisma: `npx prisma init`.
- Configure `schema.prisma` with `postgresql` provider.
- Define models: `User`, `Session`, `Account`, `Verification` (for Better Auth), plus `Contractor`, `Contract`.
- Run `npx prisma migrate dev` to push schema to Supabase.

#### [NEW] Better Auth Integration

- Install `better-auth`.
- Configure `auth.ts` to use the Prisma Adapter.
- Implement Email/Password auth (`emailAndPassword` plugin).
- Create Login/Register pages.
- Protect routes via Middleware and/or Server Component checks.

### Phase 3: Core Features (CRUD)

#### [NEW] Contractors Module

- **List (Read):** Server Component fetching data via `prisma.contractor.findMany()`.
- **Create/Edit (Write):** Server Actions using `prisma` and `zod`.
- **UI:** Data Table with Shadcn UI.

#### [NEW] Contracts Module

- **List:** Server Component fetching `prisma.contract.findMany({ include: { contractor: true } })`.
- **Create:** Server Action with:
  - VAT Calculation (19% logic).
  - Status management (Draft/Active).
- **UI:** Forms with dynamic search for contractors.

### Phase 4: Advanced Features

#### [NEW] Document Generation

- API Route or Action to generate Word docs using `docx` library.
- Fill templates with contract data.

#### [NEW] Dashboard

- Server Component to calculate stats:
  - `prisma.contract.count()`
  - `prisma.contract.aggregate({ _sum: { value: true } })`

## Verification Plan

### Manual Verification

1.  **Auth Flow:** Register, Login, Logout, Protected Route access.
2.  **Database:** Verify tables created in Supabase Dashboard via Prisma Migration.
3.  **CRUD:** Create/Edit/Delete Contractors and Contracts. Verify data persistence.
4.  **Business Logic:** Check VAT calculation on contract creation.
5.  **Docs:** Generate and download a contract `.docx` file.
