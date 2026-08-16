# Deploy do backend na Render (grátis)

Este guia cobre o backend (API + Prisma) e o banco MySQL gratuito. O frontend já está
coberto em `frontend/DEPLOY_VERCEL.md`.

## 1. Criar o banco MySQL gratuito (Aiven)

1. Crie uma conta em [aiven.io](https://aiven.io).
2. Crie um novo serviço → **MySQL** → plano gratuito (Free/Hobbyist).
3. Aguarde o serviço ficar "Running" e abra a aba **Overview**.
4. Copie a **Service URI** (algo como
   `mysql://avnadmin:SENHA@mysql-xxxx.aivencloud.com:12345/defaultdb?ssl-mode=REQUIRED`).
   Essa é a sua `DATABASE_URL`.

> Guarde essa URL com cuidado — ela contém a senha do banco. Nunca a coloque no código,
> só em variáveis de ambiente (é exatamente para isso que serve o Render Blueprint abaixo).

## 2. Subir o código para o GitHub

Se o repositório ainda não existir (pule se já fez isso para o frontend):

```bash
cd wedding-platform
git init
git add .
git commit -m "Estrutura inicial do projeto"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/wedding-platform.git
git push -u origin main
```

## 3. Deploy na Render usando o Blueprint (`render.yaml`)

Já preparei o arquivo `render.yaml` na raiz do projeto — ele descreve o serviço todo,
então a Render configura build, start e variáveis automaticamente.

1. Acesse [render.com](https://render.com) e faça login com o GitHub.
2. Clique em **New → Blueprint**.
3. Selecione o repositório `wedding-platform`. A Render vai detectar o `render.yaml`
   automaticamente e mostrar o serviço `wedding-backend`.
4. Antes de confirmar, preencha as duas variáveis marcadas como `sync: false`:
   - `DATABASE_URL` → cole a Service URI do Aiven (passo 1).
   - `CORS_ORIGIN` → cole a URL do seu frontend na Vercel, ex.:
     `https://wedding-platform.vercel.app`.
5. Clique em **Apply**. A Render vai:
   - Instalar as dependências (`npm install`, o que já gera o Prisma Client via `postinstall`);
   - Buildar o TypeScript (`npm run build`);
   - Rodar as migrations no banco do Aiven (`npm run migrate:deploy`);
   - Subir o servidor (`npm start`).

Em alguns minutos você recebe uma URL pública do tipo:

```
https://wedding-backend.onrender.com
```

## 4. Conectar o frontend a essa URL

Volte no painel da Vercel → **Settings → Environment Variables** → edite `VITE_API_URL`
para:

```
https://wedding-backend.onrender.com/api
```

Depois faça um **redeploy** do frontend (Vercel → Deployments → "..." → Redeploy) para
que a variável seja aplicada.

## 5. Testar

- `https://wedding-backend.onrender.com/api/health` deve responder `{"status":"ok"}`.
- `https://wedding-backend.onrender.com/api/wedding/tiago-e-nome` deve responder `404`
  até que exista um casamento com esse slug no banco (ainda não temos seed/admin — isso
  vem em fases futuras).

## Limitações do plano grátis (Render)

- O serviço **dorme após 15 minutos sem tráfego**; a primeira requisição depois disso
  leva de 30 a 60 segundos para responder (o servidor está "acordando").
- Você tem **750 horas grátis por mês** — de sobra para um site de casamento.
- Não há downtime além desse "acordar"; depois do primeiro request, o serviço responde
  normalmente até dormir de novo.

## Alterar variáveis depois

Qualquer variável (inclusive `DATABASE_URL` e `CORS_ORIGIN`) pode ser editada depois em
**Render → seu serviço → Environment**, sem precisar mexer no `render.yaml`.
