# Desafio Backend Júnior

Bem-vindo(a) ao desafio técnico da **Direito Ágil**! 
Este repositório contém a base do teste para a vaga de **Backend Júnior (NestJS)**.
---

## Objetivo

O objetivo deste desafio é avaliar sua capacidade de:

- Ler e entender um projeto NestJS já iniciado
- Implementar novas funcionalidades de forma organizada e funcional
- Aplicar boas práticas básicas de código, validação e organização
- Demonstrar atenção aos fluxos de autenticação, middleware e operações CRUD

---

## O que você deve fazer

Implemente as seguintes melhorias no projeto:

1. **Middleware de requisição**
   - Interceptar as requisições e gerar um `x-request-id` quando ele não for enviado pelo cliente.
   - Reutilizar o `x-request-id` quando ele já vier na requisição.
   - Manter o log das requisições com método, rota, status e tempo de execução.

2. **Autenticação**
   - Implementar a validação do token no guard da aplicação.
   - Proteger as rotas de `cases` usando `Authorization: Bearer <token>`.
   - Garantir que requisições sem token válido recebam resposta `401 Unauthorized`.

3. **Operações de CRUD**
   - Completar as operações de `GET`, `POST`, `PUT` e `DELETE` para o recurso de casos.
   - Permitir criar, listar, consultar, atualizar e remover registros em memória.
   - Garantir o retorno de `404` quando o registro não existir.

4. **Questões técnicas**
   - Leia as perguntas sobre o desafio ao final deste README e responda cada uma delas.

---

## Estrutura do projeto

A base já vem configurada com:

- NestJS 11+
- Estrutura inicial de módulos, controladores, serviços e middleware
- Rotas separadas para autenticação e casos
- Testes de ponta a ponta (`e2e`) já preparados

Você **não precisa** criar banco de dados, fila, cache ou integração externa.  
A ideia é focar na **lógica da API, autenticação e organização do código**.

---

## Como executar o projeto

```bash
git clone https://github.com/direito-agil/direito-agil-backend-test-case.git
cd direito-agil-backend-test-case
```

Instale as dependências e rode o projeto:

```bash
npm install
npm run start:dev
```

Para executar os testes:

```bash
npm run test
npm run test:e2e
```

---

## Orientações para o candidato

### Middleware

Arquivo: `src/common/middleware/request-metrics.middleware.ts`

- Gere um `x-request-id` quando ele não vier na requisição.
- Reaproveite o valor recebido quando o cliente já enviar esse header.
- Mantenha o log das requisições ativo.

### Autenticação

Arquivo: `src/auth/auth.guard.ts`

- Valide o formato do header `Authorization`.
- Aceite somente tokens no formato `Bearer <token>`.
- Compare o token recebido com o valor retornado por `AuthService.getAccessToken()`.
- Retorne `401` quando o token estiver ausente ou inválido.

Endpoint disponível para login:

- `POST /auth/login`
- Corpo esperado:

```json
{
  "username": "candidate",
  "password": "123456"
}
```

### CRUD de casos

Arquivo: `src/cases/cases.service.ts`

Implemente:

- `update(id, updateCaseDto)`
- `remove(id)`

Regras:

- Retorne `404` quando o caso não existir.
- Atualize apenas os campos enviados no `PUT`.
- Atualize o campo `updatedAt` ao alterar o registro.
- Remova o item da memória ao executar o `DELETE`.

### Rotas disponíveis

#### Públicas

- `GET /health`
- `POST /auth/login`

#### Protegidas

- `POST /cases`
- `GET /cases`
- `GET /cases/:id`
- `PUT /cases/:id`
- `DELETE /cases/:id`

---

## O que será avaliado

| Critério | Descrição |
|----------|-----------|
| **Organização** | Estrutura de pastas, nomeação de arquivos e clareza do código |
| **Boas práticas NestJS** | Uso correto de `@Module`, `@Controller`, `@Injectable`, `Guard` e middleware |
| **HTTP e API** | Respeito aos verbos HTTP, status codes e comportamento esperado |
| **Autenticação** | Validação correta do token e proteção das rotas |
| **Funcionalidade** | Middleware, autenticação e CRUD funcionando conforme o esperado |
| **Testes** | Capacidade de entender e manter os testes existentes |

---

## Perguntas sobre o desafio

1. Qual a diferença entre middleware, guard e interceptor no NestJS?
2. Em que momento você usaria um guard em vez de validar o token dentro do controller?
3. Como você trataria autenticação em um projeto real?
4. O que é idempotência? Quais métodos HTTP deste projeto são idempotentes?
5. Qual status code você retornaria em cada caso?
   - Token inválido
   - Recurso não encontrado
   - Corpo da requisição inválido
6. Como você substituiria o armazenamento em memória por um banco de dados?
7. Como você testaria esse projeto em unidade e em ponta a ponta?
8. Que problema pode acontecer se duas pessoas atualizarem o mesmo recurso ao mesmo tempo?
9. Como você melhoraria a validação dos dados de entrada?
10. Qual foi a parte mais importante da solução que você escolheu e por quê?

---

## Dicas para quem está começando

- Leia os testes antes de começar a implementar.
- Faça pequenas alterações e valide com frequência.
- Dê preferência a código simples e legível.
- Não se preocupe em criar uma arquitetura exagerada para este teste.
- Se precisar, use os próprios arquivos do projeto como guia para entender o padrão esperado.

---

## Entrega

1. Crie um fork deste repositório na sua conta do GitHub.
2. Crie uma nova branch.
3. Faça as alterações solicitadas.
4. Suba o código para o seu fork.
5. Crie uma Pull Request para o repositório original.

---

## Observação

Este teste foi pensado para avaliar principalmente a clareza da solução, o entendimento dos conceitos básicos de backend e a capacidade de evoluir um projeto já iniciado.
