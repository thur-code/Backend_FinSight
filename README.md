# FinSight API

API REST para controle financeiro pessoal, com autenticação, gestão de transações e geração de insights financeiros.  
O projeto foi pensado com arquitetura limpa, validação forte e foco em escalabilidade, testes e futura integração com IA.

---

## 🚀 Tecnologias

- Node.js  
- TypeScript  
- Express  
- Prisma ORM  
- PostgreSQL / SQLite
- JWT (Autenticação)  
- Zod (validação e contratos)  
- OpenAI API

---

## 📁 Arquitetura

O projeto segue separação clara de responsabilidades:

src/
- ├─ config/ # Configurações (env, prisma, jwt, password)
- ├─ controller/ # Controllers (HTTP layer)
- ├─ services/ # Regras de negócio
- ├─ schemas/ # Validação e contratos (Zod)
- ├─ middlewares/ # Middlewares (auth, erros)
- ├─ routes.ts # Rotas da aplicação
- ├─ docs/ # Swagger / OpenAPI
- └─ server.ts # Bootstrap da aplicação

---

## 🔐 Autenticação

- Autenticação via JWT (Bearer Token)
- Middleware `isAuthenticated` protege rotas privadas
- O `user_id` é extraído do token e propagado na requisição

---

## 👤 Funcionalidades de Usuário

- Criar usuário
- Login
- Obter dados do usuário autenticado (`/me`)
- Atualizar dados do usuário
- Deletar conta

---

## 💸 Funcionalidades de Transações

- Criar transação (INCOME / EXPENSE)
- Listar transações
- Filtrar por tipo, valor e categoria
- Atualizar transação
- Deletar transação
- Summary financeiro (income, expense, balance)

---

## 📊 Summary

Endpoint que retorna:
- Total de entradas
- Total de saídas
- Saldo final

> Filtros avançados (datas, categorias) serão adicionados futuramente.

---

## Inteligência artificial
Integração com a API da OpenAI para:
- Gerar insights financeiros
- Sugestões de economia
- Análises personalizadas com base nas transações

---

## Rodando o projeto

# instalar dependências
```
npm install
```

# rodar migrations
```
npx prisma migrate dev
```

# iniciar servidor
```
npm run dev
```
