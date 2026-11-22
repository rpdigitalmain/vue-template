# Vue Template

![Vue 3](https://img.shields.io/badge/Vue-3-4FC08D?logo=vuedotjs&logoColor=white)
![Node.js 24](https://img.shields.io/badge/Node.js-24-339933?logo=nodedotjs&logoColor=white)
![Vite 8](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white)

Template de frontend com Vue 3, JavaScript e Vite. A imagem de produção usa Nginx para servir o build.

## Requisitos

- Node.js 24.12 ou superior, ou Node.js 22.18 ou superior da série 22, e npm.
- Docker com Compose para executar o contêiner de produção.
- `act` e Docker em execução para rodar a CI localmente.

## Desenvolvimento

```sh
npm ci
npm run dev
```

Abra [http://localhost:5173](http://localhost:5173). O código-fonte fica em `src/`. Os arquivos estáticos de `public/` são copiados para o build sem transformação.

## Build e execução

```sh
npm run build
npm run preview
```

O Vite gera o build em `dist/`. A prévia local fica em [http://localhost:4173](http://localhost:4173).

### Docker

```sh
docker compose up --build -d
```

Abra [http://127.0.0.1:8080](http://127.0.0.1:8080). Para mudar a porta no host, defina `HOST_PORT` no ambiente ou em um arquivo `.env` ao lado do Compose, por exemplo, `HOST_PORT=8081`.

O Dockerfile compila o frontend com Node.js e copia `dist/` para uma imagem Nginx executada como usuário sem privilégios. O Nginx serve `index.html` para rotas do frontend acessadas diretamente.

Para parar e remover o contêiner, execute `docker compose down`.

## Verificações

```sh
npm run lint
npm run build
```

O ESLint verifica arquivos JavaScript e componentes Vue. O GitHub Actions executa lint, build e testes de ponta a ponta em pull requests e em pushes para `main` e `develop`.

### Testes de ponta a ponta

```sh
npx playwright install chromium
npm run test:e2e
```

O Playwright inicia o servidor de desenvolvimento do Vite localmente e executa os testes de `test/` no Chromium. Na CI, o Playwright inicia a prévia do build gerado na etapa anterior.

### CI local com act

Com o Docker em execução, rode os comandos a partir da raiz do repositório.

```sh
act push -j checks
act pull_request -j checks
```

O arquivo `.actrc` associa o runner `ubuntu-latest` à imagem `catthehacker/ubuntu:act-24.04`. Na primeira execução, o `act` baixa essa imagem.
