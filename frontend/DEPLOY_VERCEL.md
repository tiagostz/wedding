# Deploy do frontend na Vercel

Este guia cobre **apenas o frontend** (React + Vite). O backend (API + banco de dados)
deve ser hospedado separadamente (ex.: Render + Aiven) e sua URL informada aqui via
variável de ambiente.

## Passo a passo

### 1. Subir o código para o GitHub

Se ainda não tiver um repositório:

```bash
cd wedding-platform
git init
git add .
git commit -m "Estrutura inicial do projeto"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/wedding-platform.git
git push -u origin main
```

### 2. Importar o projeto na Vercel

1. Acesse [vercel.com](https://vercel.com) e faça login com sua conta do GitHub.
2. Clique em **Add New → Project**.
3. Selecione o repositório `wedding-platform`.
4. Em **Root Directory**, clique em "Edit" e escolha a pasta `frontend`
   (a Vercel vai detectar automaticamente o framework Vite pelo `vercel.json`).

### 3. Configurar a variável de ambiente

Ainda na tela de configuração do projeto (ou depois, em **Settings → Environment Variables**):

| Nome            | Valor                                              |
|------------------|-----------------------------------------------------|
| `VITE_API_URL`   | URL pública do seu backend + `/api`, ex: `https://wedding-backend.onrender.com/api` |

> Enquanto o backend ainda não estiver no ar, você pode deixar essa variável apontando
> para `http://localhost:3333/api` — o site sobe normalmente, só o RSVP/galeria/presentes
> não vão funcionar até o backend estar publicado.

### 4. Deploy

Clique em **Deploy**. A Vercel instala as dependências, roda `npm run build` e publica
o conteúdo de `dist/`. Em poucos minutos você recebe uma URL do tipo:

```
https://wedding-platform.vercel.app
```

### 5. Deploys automáticos

A partir daqui, todo `git push` na branch `main` gera um novo deploy automaticamente.
Pull requests geram *preview deployments* com URL própria — ótimo para revisar mudanças
antes de publicar.

### 6. Domínio próprio (opcional)

Em **Settings → Domains**, você pode apontar um domínio próprio (ex.: `tiagoenoiva.com.br`)
gratuitamente — a Vercel cuida do certificado SSL automaticamente.

## Checklist antes de publicar

- [ ] `VITE_API_URL` configurada com a URL real do backend
- [ ] Backend já publicado e respondendo em `/api/wedding/:slug`
- [ ] CORS do backend liberado para o domínio da Vercel (`CORS_ORIGIN`)
- [ ] Testar em mobile (360px) depois do deploy
