# Database Setup

Property Chronicle currently runs with a local JSON store so product review can continue without secrets. The next production foundation is Neon Postgres through Prisma.

## Current Status

- Prisma is installed and pinned to v6 for the standard `DATABASE_URL` workflow.
- Schema lives at `prisma/schema.prisma`.
- Seed script lives at `prisma/seed.ts`.
- Public-source research batch scripts live under `prisma/`, starting with `prisma/add-east-toronto-records.ts`.
- The app can now read/write through Prisma when `DATABASE_URL` is present.
- Without `DATABASE_URL`, the app falls back to the local JSON store for design/product review.

## Adapter Behavior

`src/lib/store.ts` chooses the active persistence layer:

- no `DATABASE_URL`: local JSON store at `data/store.local.json`
- with `DATABASE_URL`: Prisma/Postgres store through `src/lib/db-store.ts`

The current Prisma adapter preserves the existing MVP store API by reading the current database state into the app's store shape, applying the existing mutation, then writing the resulting store back to Postgres.

This is acceptable for early MVP/admin testing, but it is not the final high-concurrency production persistence pattern. After product workflows settle, replace full-store rewrites with targeted Prisma operations for imports, approvals, submissions, reports, saves, and audit logs.

CSV is not the primary product data path. It is an admin convenience for bulk review. The main data path should be public-source research ingestion: scripts now, then monitored source pipelines later, with every record tied to at least one source URL and a neutral summary.

## Environment

Create `.env.local` and add:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST/DB?sslmode=require"
```

Use the pooled Neon connection string for normal serverless/web app traffic. Keep the direct connection string available later if migrations require it.

## Commands

Generate Prisma client:

```powershell
npm.cmd run db:generate
```

Push schema to Neon:

```powershell
npm.cmd run db:push
```

Seed development records:

```powershell
npm.cmd run db:seed
```

Add the first East Toronto public-source batch:

```powershell
npm.cmd run db:add-east-toronto
```

Build app:

```powershell
npm.cmd run build
```

## Migration Plan

1. Keep JSON fallback active while UI/product work continues.
2. Add Neon `DATABASE_URL` to `.env.local`.
3. Run `npm.cmd run db:push`.
4. Run `npm.cmd run db:seed`.
5. Review map/admin/report flows against Neon data.
6. Replace full-store rewrite adapter with targeted Prisma operations.
7. Add CSV import preview, duplicate detection, and geocoding cache.

## Data Model Principle

A property is the location. An incident is the sourced claim.

Published incident data must preserve:
- property address and map coordinates
- incident category and year/date
- neutral public summary
- at least one source title/name/URL/retrieval date
- status and sensitivity controls
- audit logs for exact address views and report downloads
