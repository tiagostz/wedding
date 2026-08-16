# API

Base URL: `http://localhost:3333/api`

Todos os endpoints retornam JSON. Erros seguem o formato:

```json
{ "error": "mensagem" }
```

Erros de validação (Zod) retornam `422` com detalhe por campo.

## Público

| Método | Rota                  | Descrição                                | Status |
|--------|------------------------|--------------------------------------------|--------|
| GET    | `/wedding/:slug`       | Dados públicos do site de casamento        | ✅ implementado |
| GET    | `/photos/:weddingSlug` | Galeria de fotos                            | 🔜 Fase 7 |
| GET    | `/gifts/:weddingSlug`  | Lista de presentes                          | 🔜 Fase 8 |
| POST   | `/rsvp`                | Confirmar/recusar presença                  | ✅ implementado |
| POST   | `/auth/login`          | Login dos noivos/admin                      | 🔜 Fase 10 |

### POST /rsvp

```json
{
  "weddingSlug": "tiago-e-nome",
  "fullName": "Maria Silva",
  "email": "maria@email.com",
  "phone": "11999999999",
  "status": "CONFIRMED",
  "companionsQty": 1,
  "companionNames": "João Silva",
  "notes": "Somos vegetarianos"
}
```

Resposta `201`:

```json
{ "data": { "id": "...", "status": "CONFIRMED", "...": "..." } }
```

## Admin (autenticado — `Authorization: Bearer <token>`)

| Método | Rota                        | Descrição                          | Status |
|--------|------------------------------|--------------------------------------|--------|
| GET    | `/admin/rsvps/:weddingId`    | Lista confirmações de um casamento   | ✅ implementado |
| POST   | `/admin/photos`              | Upload de foto                        | 🔜 Fase 9 |
| POST   | `/admin/gifts`                | Cadastro de presente                  | 🔜 Fase 9 |
