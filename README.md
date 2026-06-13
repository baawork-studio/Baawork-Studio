# Baawork Studio Monorepo

This monorepo contains the existing Baawork Studio applications migrated with `git subtree` so each original repository keeps its source history.

## Structure

```text
Baawork-Studio-Monorepo/
├── apps/
│   ├── customer/       # Baawork-Studio
│   ├── admin/          # Baawork-Studio-Admin
│   └── api/            # Baawork-Studio-Api
├── packages/
│   ├── shared-types/
│   └── shared-utils/
├── docs/
├── infra/
├── docker-compose.yml
└── .github/
    └── workflows/
```

## Requirements

- Node.js and npm for `apps/customer` and `apps/admin`
- Go 1.23 for `apps/api`
- Docker for local Postgres and Redis

## Environment Files

Each app keeps its own environment file usage:

- `apps/customer/.env.example`
- `apps/admin/.env.example`
- `apps/api/.env.example`

Create local `.env` files inside each app folder when needed.

## Local Infrastructure

Start Postgres and Redis from the monorepo root:

```powershell
docker compose up -d postgres redis
```

The local defaults match the API environment example:

- Postgres: `localhost:55432`
- Redis: `localhost:6379`

## Run API

```powershell
cd apps/api
go run .
```

API URL:

```text
http://localhost:8080
```

Health check:

```text
http://localhost:8080/health
```

## Run Customer App

```powershell
cd apps/customer
npm install
npm run dev
```

Customer URL:

```text
http://localhost:5173
```

## Run Admin App

```powershell
cd apps/admin
npm install
npm run dev
```

Admin URL:

```text
http://localhost:5174
```

## Build Apps

Customer:

```powershell
cd apps/customer
npm ci
npm run build
```

Admin:

```powershell
cd apps/admin
npm ci
npm run build
```

API:

```powershell
cd apps/api
go test ./...
go build ./...
```

## Deployment

Each app remains independently deployable from its own folder:

- Customer app root: `apps/customer`
- Admin app root: `apps/admin`
- API app root: `apps/api`

