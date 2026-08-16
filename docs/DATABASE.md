# Banco de dados

Banco: **MySQL**, gerenciado via **Prisma** (`database/schema.prisma`).

## Entidades

| Tabela        | Descrição                                              | Tenant (wedding_id) |
|---------------|----------------------------------------------------------|:---:|
| `users`       | Contas (noivos e admins da plataforma)                   | —   |
| `weddings`    | Tenant raiz — um casamento/site                            | —   |
| `guests`      | Convidados de um casamento                                | ✔   |
| `rsvps`       | Confirmação de presença (1:1 com `guests`)                | ✔   |
| `events`      | Cerimônia / recepção                                      | ✔   |
| `photos`      | Fotos da galeria                                           | ✔   |
| `gifts`       | Itens da lista de presentes                                | ✔   |
| `gift_orders` | Pedidos/reservas de presente (preparado p/ pagamento futuro) | via `gift` |
| `faqs`        | Perguntas frequentes                                        | ✔   |

## Relacionamentos principais

- `User 1—N Wedding` (um usuário pode ter mais de um casamento no futuro, plano premium).
- `Wedding 1—N {Guest, Rsvp, Event, Photo, Gift, Faq}`.
- `Guest 1—1 Rsvp` — constraint `unique(guestId)` em `rsvps` impede confirmações duplicadas
  para o mesmo convidado.
- `Gift 1—N GiftOrder` — estrutura pronta para integração de gateway de pagamento
  (`paymentRef`, `status`), sem processar pagamentos reais nesta fase.

## Migrations

Geradas a partir do `schema.prisma`:

```bash
cd backend
npm run prisma:migrate
```

As migrations resultantes ficam em `database/migrations/`.
