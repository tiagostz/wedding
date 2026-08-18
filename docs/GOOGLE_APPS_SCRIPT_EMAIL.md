# Envio de confirmação por e-mail

O formulário já envia o campo `email` para o webhook do Google Sheets. Para que o convidado receba uma confirmação, o Apps Script usado pelo webhook precisa executar também o envio pelo `MailApp`.

## Configuração

1. Abra a planilha usada para as confirmações.
2. Acesse **Extensões → Apps Script**.
3. Substitua o conteúdo do editor pelo arquivo [`google-apps-script/Code.gs`](./google-apps-script/Code.gs).
4. Salve o projeto.
5. Em **Implantar → Gerenciar implantações**, edite a implantação do tipo **Aplicativo da Web**.
6. Execute como você e permita acesso para qualquer pessoa com o link.
7. Mantenha a mesma URL do webhook configurada no frontend.
8. Na primeira confirmação com e-mail, o Google solicitará autorização para enviar mensagens.

O script continua registrando as respostas na aba `Respostas` (ou na primeira aba existente) e envia e-mail somente quando o campo de e-mail estiver preenchido.

O envio usa a cota gratuita do Google Apps Script: normalmente 100 destinatários por dia em uma conta Gmail pessoal e 1.500 em uma conta Google Workspace.
