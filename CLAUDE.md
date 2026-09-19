# CLAUDE.md

## Project Identity

- **Project:** Xentech
- **Description:** SaaS multi-tenant para gestionar una base de datos
  interactiva de clientes (contacto + estado de cuota), con agentes de
  IA opcionales habilitables por organización por el admin de
  plataforma.

---

## Project Context

> Editar esta sección a medida que avanza el proyecto.

- **Stack:** Node.js + Express + TypeScript, Prisma ORM, PostgreSQL
  (Supabase), autenticación Supabase Auth (JWT vía JWKS) — mismo stack
  que `PlataformaCRM`, del que se reutilizan patrones de multi-tenancy
  y autenticación (no el código: repo nuevo).
- **Status / Phase:** Fase 0 (fundamentos) en progreso. Schema inicial
  (`Organization`, `User`, `PlatformAdmin`, `Cliente`,
  `OrganizationAgentToggle`), esqueleto de Express con auth y CI
  armados. Falta: proyecto de Supabase real (DATABASE_URL/JWKS), CRUD
  de clientes (Fase 1).
- **Key context:** el brief completo de producto (MVP, modelo de
  datos, roadmap) vive en el doc de Cowork enlazado desde
  `docs/estado-actual.md` — leerlo ahí antes de asumir alcance.

---

## Política de merge

A diferencia de `PlataformaCRM` (que prohíbe el auto-merge por decisión
de proceso), **en Xentech el auto-merge está permitido y es la regla
por defecto**: Rocco confirmó esto explícitamente el 2026-09-19, ya
sabiendo que el CRM usa el criterio contrario — es una decisión
deliberada para este repo, no un descuido.

- Se mergea automáticamente (`gh pr merge --squash` o equivalente)
  cuando el PR pasa CI (typecheck, lint, format, tests) sin errores.
- Si el CI falla, no se mergea: se reporta el estado y ahí termina la
  tarea (o se corrige, si la tarea lo permite).
- Cambios de alto riesgo (migraciones destructivas, borrado de datos,
  cambios de seguridad/permisos) siguen pidiendo confirmación explícita
  de Rocco antes de mergear, aunque el CI esté verde — el auto-merge
  cubre el trabajo de rutina, no todo sin excepción.

## GitHub CLI (`gh`)

Mismo criterio que `PlataformaCRM`: PRs con `gh pr create --body-file`
(nunca `--body` inline), estado de CI con `gh pr checks` / `gh run
watch` en vez de pedir capturas.
