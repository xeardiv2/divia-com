# DIVIA

Aplicación de telemedicina con Next.js, TypeScript, Cloudflare D1 y Cloudflare Stream.

## Requisitos

- Node 18+
- Cloudflare account
- Wrangler CLI

## Variables de entorno

Copia `.env.example` a `.env.local` y completa tus valores reales.

## Base de datos D1

```bash
npm install
npx wrangler d1 create divia-prod
npm run db:init
```

## Deploy

```bash
npx wrangler deploy
```

## Funcionalidades base

- Registro de pacientes y profesionales
- Validación de matrícula
- Login con JWT
- Lista de espera por profesional
- Videollamada con Cloudflare Stream
- Registro de signos vitales

