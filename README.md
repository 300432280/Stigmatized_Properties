# Property Chronicle

Property Chronicle is a map-first property history intelligence app for sourced, neutral research into stigmatized or sensitive property records.

## Local setup

```powershell
npm.cmd install
npm.cmd run dev
```

Open `http://localhost:3000`.

Local admin account:

```txt
admin@propertychronicle.local
admin
```

## Environment

Copy `.env.example` to `.env.local` when you are ready to connect external services. Neon is a drop-in `DATABASE_URL`; the first MVP runs locally with a JSON store so no secret is required to try the product.

See `docs/DATABASE.md` for the Prisma/Neon setup path.
