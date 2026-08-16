# Deploy

Este guia será expandido na Fase 14. Visão inicial:

## Ambiente com Docker

```bash
docker compose -f docker-compose.yml up --build -d
```

## Variáveis de ambiente obrigatórias (backend)

- `DATABASE_URL`
- `JWT_SECRET`
- `CORS_ORIGIN`

## Sugestão de infraestrutura

- Backend + MySQL: qualquer provedor com suporte a Docker (Railway, Render, EC2, etc.)
- Frontend: build estático (`npm run build`) servido via Vercel, Netlify ou Nginx.
- Domínio personalizado por casamento: preparado na Fase 25 (multi-tenant avançado).
