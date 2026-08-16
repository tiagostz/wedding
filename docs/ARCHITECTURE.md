# Arquitetura

## Visão geral

O projeto é dividido em três camadas totalmente separadas:

- **Frontend** (React + TS + Vite): interface pública do site de casamento e, futuramente,
  painel administrativo dos noivos.
- **Backend** (Node + TS + Express): API REST, autenticação, regras de negócio.
- **Banco de dados** (MySQL, via Prisma): persistência, com isolamento multi-tenant.

## Multi-tenant

Cada casamento é um **tenant** representado pela entidade `Wedding`, identificado por um
`slug` único usado na URL (`/casamento/{slug}`). Todas as entidades filhas (`Guest`, `Rsvp`,
`Event`, `Photo`, `Gift`, `Faq`) possuem `wedding_id` obrigatório, e todas as queries do
backend filtram por esse campo — nenhuma consulta deve retornar dados de mais de um
casamento ao mesmo tempo. Isso permite evoluir de "um site" para "uma plataforma SaaS"
sem reescrever o modelo de dados.

## Padrão de camadas no backend

```
routes -> controllers -> services -> repositories -> Prisma
```

- **routes**: apenas mapeiam método HTTP + path para um controller.
- **controllers**: validam entrada (Zod) e formatam a resposta HTTP.
- **services**: regras de negócio (ex.: impedir RSVP duplicado, checar se o casamento existe).
- **repositories**: única camada que fala com o Prisma/banco.

Esse padrão facilita testes (mockar repository) e evita duplicação de lógica.

## Decisões de segurança

- Senhas com `bcrypt`.
- Autenticação via JWT (`Authorization: Bearer <token>`).
- `helmet` para headers de segurança HTTP.
- Rate limiting nos endpoints sob `/api` (mais restritivo em RSVP e auth).
- Validação de entrada com Zod em todos os endpoints que recebem body.
- Segredos apenas via `.env` (nunca commitados).

## Fases de desenvolvimento

Ver checklist de progresso no `README.md`. Cada fase, ao ser concluída, deve atualizar
este documento se alterar decisões de arquitetura.
