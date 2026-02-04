⭐ README PROFISSIONAL (Use este)
# ✈️ API Demo Flight — TypeScript + Node.js + PostgreSQL

API REST desenvolvida para gerenciamento de dados de voos, utilizando **Node.js, Express e PostgreSQL**, com autenticação JWT e arquitetura em camadas.

Este projeto foi convertido de JavaScript para **TypeScript**, aplicando tipagem forte, DTOs, Services, Repositories e Generics.

---

## 🚀 Tecnologias

- **Node.js**
- **Express**
- **TypeScript**
- **PostgreSQL**
- **JWT (jsonwebtoken)**
- **dotenv**
- **ts-node-dev**

---

## ⭐ Principais Características

✅ Autenticação com JWT  
✅ Controle de acesso (**admin / regular**)  
✅ CRUD protegido para usuários  
✅ Rotas públicas de alta performance  
✅ Consulta JOIN preparada para teste de carga  
✅ Arquitetura em camadas  
✅ Uso de **Interfaces, Classes e Generics**  
✅ Build com TypeScript  

---

## 🧠 Arquitetura do Projeto

O sistema foi estruturado seguindo boas práticas de backend:



src/
├── config/ → conexão com banco
├── controllers/ → camada HTTP (req/res)
├── services/ → regras de negócio (Classes com métodos)
├── repositories/ → acesso a dados + Generics
├── middlewares/ → autenticação JWT
├── routes/ → definição das rotas
├── types/ → interfaces e DTOs


### Separação de responsabilidades:

- **Controller:** recebe a requisição  
- **Service:** aplica regras de negócio  
- **Repository:** executa queries  
- **Types:** garante tipagem forte  

👉 Essa abordagem melhora a escalabilidade e manutenção do sistema.

---

## 📋 Requisitos

- Node.js **20+**
- PostgreSQL **16+**
- Banco `demo_flight` importado

---

## ⚙️ Instalação

```bash
npm install

🔐 Configuração

Crie um arquivo .env baseado no .env.example.

Exemplo:
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=sua_senha
DB_DATABASE=demo_flight
JWT_SECRET=seu_segredo_super_forte
JWT_EXPIRES_IN=1h

▶️ Rodando o Projeto
Desenvolvimento
npm run dev

Build (TypeScript → JavaScript)
npm run build

Produção
npm start


Servidor:

http://localhost:3000

📌 Endpoints
🔓 Login (público)
POST /api/login

{
  "login_email": "a@a.com",
  "password": "12345"
}

🌍 Consultas Públicas

GET /api/aircraft

GET /api/passenger

GET /api/flight

GET /api/boarding-pass

GET /api/boarding-pass/full ⭐ (JOIN para teste de carga)

🔒 Rotas Privadas (JWT)

Header obrigatório:

Authorization: Bearer <TOKEN>

Admin

GET /api/sys-user

POST /api/sys-user

DELETE /api/sys-user/:id

Admin ou próprio usuário

GET /api/sys-user/:id

PUT /api/sys-user/:id

💡 Exemplo de Login via curl
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"login_email":"a@a.com","password":"12345"}'

✅ Status do Projeto

✔ API totalmente funcional
✔ TypeScript implementado
✔ Arquitetura em camadas
✔ Autenticação JWT
✔ CRUD protegido
✔ Generics aplicados
✔ Build passando

👨‍💻 Autor

Fábio Antônio
Estudante de Análise e Desenvolvimento de Sistemas
Desenvolvedor Back-End


---
