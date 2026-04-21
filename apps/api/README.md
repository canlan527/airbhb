# Airbhb API

NestJS + Prisma + PostgreSQL backend for the Airbhb full-stack demo.

## Features

- JWT auth with demo roles: `USER`, `HOST`, `ADMIN`
- Public house list/detail APIs
- Compatibility APIs for the existing frontend: `/api/home/*`, `/api/entire/list`
- User center APIs: favorites, browse histories, orders, user-published houses
- Admin APIs: dashboard, platform houses, orders, users

## Demo Accounts

After running seed:

```text
user@example.com / 123456
host@example.com / 123456
admin@example.com / 123456
```

## Local Setup

```bash
cp .env.example .env
pnpm install
pnpm --filter @airbhb/api prisma generate
pnpm --filter @airbhb/api prisma migrate dev
pnpm --filter @airbhb/api prisma db seed
pnpm --filter @airbhb/api start:dev
```

The API runs at:

```text
http://localhost:3001/api
```
