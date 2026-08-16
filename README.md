# Wedding Platform

Plataforma para criação de sites de casamento — elegante, responsiva e preparada para
multi-tenant (SaaS), permitindo futuramente que vários casais tenham seus próprios sites
em `/casamento/{slug}`.

## Stack

- **Frontend:** React + TypeScript + Vite + Tailwind CSS + React Router + Axios
- **Backend:** Node.js + TypeScript + Express + Prisma + JWT + bcrypt + Zod
- **Banco de dados:** MySQL
- **Infra:** Docker + docker-compose

## Estrutura

```
/wedding-platform
  /frontend      -> aplicação React (interface pública + preparo para admin)
  /backend       -> API REST em Express
  /database      -> schema Prisma (migrations geradas a partir dele)
  /docs          -> documentação (arquitetura, banco, API, deploy)
  docker-compose.yml
```

## Como rodar localmente

```bash
# 1. Configurar variáveis de ambiente
cp backend/.env.example backend/.env

# 2. Subir tudo (MySQL + backend + frontend)
docker compose up --build

# 3. Rodar migrations (primeira vez)
cd backend
npm install
npm run prisma:migrate
```

- Frontend: http://localhost:5173
- Backend:  http://localhost:3333/api

## Status do desenvolvimento

Este projeto é construído em fases (ver `docs/ARCHITECTURE.md`). Estado atual:

- [x] **Fase 1** — Estrutura do projeto
- [x] **Fase 2** — Banco de dados (schema Prisma com todas as entidades)
- [~] **Fase 3** — Backend e API (estrutura criada; RSVP e wedding funcionais; demais endpoints reservados)
- [~] **Fase 4** — Frontend (estrutura criada; Hero + contagem regressiva + menu funcionais)
- [ ] Fase 5 em diante — ver `docs/ARCHITECTURE.md`

## Hospedagem gratuita

- **Frontend (Vercel):** ver [`frontend/DEPLOY_VERCEL.md`](frontend/DEPLOY_VERCEL.md)
- **Backend + banco (Render + Aiven):** ver [`backend/DEPLOY_RENDER.md`](backend/DEPLOY_RENDER.md)

Ordem recomendada: banco (Aiven) → backend (Render) → frontend (Vercel), configurando a
URL de cada peça na seguinte antes de publicar.

## Documentação

- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — visão geral da arquitetura e decisões
- [`docs/DATABASE.md`](docs/DATABASE.md) — modelo de dados e relacionamentos
- [`docs/API.md`](docs/API.md) — endpoints disponíveis
- [`docs/DEPLOY.md`](docs/DEPLOY.md) — como colocar em produção
- [`CONTRIBUTING.md`](CONTRIBUTING.md) — padrões de código e fluxo de contribuição
