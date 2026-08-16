# Contribuindo

## Fluxo de desenvolvimento

Este projeto segue o desenvolvimento em fases descrito no `README.md`. Antes de
implementar qualquer funcionalidade nova:

1. Analisar a arquitetura existente (`docs/ARCHITECTURE.md`).
2. Verificar se já existe funcionalidade semelhante (evitar duplicação).
3. Reutilizar componentes/serviços/repositories quando possível.
4. Atualizar a documentação relevante (`docs/API.md`, `docs/DATABASE.md`, etc.).
5. Criar/atualizar testes.
6. Verificar segurança (validação de input, autenticação, rate limit).
7. Verificar responsividade (360px até 1440px).
8. Verificar impacto no banco (migrations).

## Padrões de código

- TypeScript estrito em frontend e backend.
- Backend: `routes -> controllers -> services -> repositories`.
- Commits pequenos e descritivos.
- Nenhuma credencial ou senha no código — apenas em `.env`.
