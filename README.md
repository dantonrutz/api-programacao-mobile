# Documentação do Back-end do App

## Pré-requisitos

Antes de iniciar, certifique-se de ter instalado em sua máquina:
* [Node.js](https://nodejs.org/)
* [Docker](https://www.docker.com/get-started/)

## Instalação

1. Clone este repositório:
```bash
git clone https://github.com/dantonrutz/api-programacao-mobile
cd /api-programacao-mobile
```

2. Instale as dependências do Node.js:
```bash
npm install
```

## Configuração do Banco de Dados

Este projeto utiliza **PostgreSQL** via Docker. Siga os passos:

1. Crie e inicie o container do banco de dados:
```bash
docker compose up --build -d
```

2. Rode as migrations do Prisma para criar as tabelas:

```bash
npx prisma migrate deploy
```

> Caso esteja em desenvolvimento e queira resetar o banco:

```bash
npx prisma migrate reset
```

## Rodando o Backend
Para iniciar a aplicação NestJS:

```bash
npm run start:dev
```

A aplicação ficará disponível em `http://localhost:3000` (padrão NestJS).
O swagger ficará disponível em `http://localhost:3000/api` (padrão Swagger).

## Comandos Úteis

* **Ver o banco diretamente**:

```bash
npx prisma studio
```
