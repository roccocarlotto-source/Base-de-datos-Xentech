# Xentech

SaaS multi-tenant para gestionar una base de datos interactiva de clientes
(contacto + estado de cuota), con agentes de IA opcionales que el admin de
plataforma habilita por organización.

El brief completo del producto (alcance del MVP, modelo de datos, roadmap por
fases) vive en el documento de Cowork **"Xentech — Brief del proyecto"** — ver
[`docs/estado-actual.md`](docs/estado-actual.md) para el link y el estado al
día.

## Stack

Node.js + Express + TypeScript, Prisma ORM sobre PostgreSQL (Supabase),
autenticación delegada a Supabase Auth (JWT vía JWKS) — mismo stack y
convenciones que `PlataformaCRM`, del que este proyecto reutiliza patrones de
multi-tenancy y autenticación.

## Desarrollo

```bash
npm install
cp .env.example .env   # completar con las credenciales de un proyecto de Supabase
npm run prisma:generate
npm run dev
```

```bash
npm run typecheck
npm run lint
npm test
```
