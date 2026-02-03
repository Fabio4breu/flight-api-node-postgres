# ✈️ API Demo Flight (Node.js + Express + PostgreSQL)

API REST para o banco **demo_flight**, contendo:

✅ Autenticação com JWT  
✅ Rotas públicas de consulta  
✅ CRUD privado para `sys_user` com regra **admin/regular**  
✅ Rota JOIN preparada para teste de carga  

---

## 🚀 Tecnologias

- Node.js
- Express
- PostgreSQL
- JWT (jsonwebtoken)
- dotenv
- nodemon

---

## 📋 Requisitos

- Node.js 20+
- PostgreSQL 16+
- Banco `demo_flight` importado

---

## ⚙️ Instalação

npm install
🔐 Configuração
Crie um arquivo .env baseado no .env.example.

Exemplo:

env

PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=sua_senha
DB_DATABASE=demo_flight
JWT_SECRET=seu_segredo
JWT_EXPIRES_IN=1h
▶️ Rodar em desenvolvimento

npm run dev
Servidor:

arduino

http://localhost:3000
📌 Endpoints
🔓 Login (público)
POST /api/login

{
  "login_email": "a@a.com",
  "password": "12345"
}
🌍 Consultas públicas
GET /api/aircraft

GET /api/passenger

GET /api/flight

GET /api/boarding-pass

GET /api/boarding-pass/full ⭐ (JOIN para teste de carga)

🔒 Rotas privadas (JWT)
Header obrigatório:

makefile

Authorization: Bearer <TOKEN>
Admin
GET /api/sys-user

POST /api/sys-user

DELETE /api/sys-user/:id

Admin ou próprio usuário
GET /api/sys-user/:id

PUT /api/sys-user/:id

💡 Exemplo de login via curl

curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"login_email":"a@a.com","password":"12345"}'
📁 Estrutura do Projeto
arduino

src/
 ├── config
 ├── controllers
 ├── middlewares
 ├── routes
 ├── app.js
 └── server.js
✅ Status do Projeto
✔ API funcional
✔ Banco conectado
✔ Autenticação JWT
✔ CRUD protegido
✔ JOIN implementado

👨‍💻 Autor
Fábio Antônio
Estudante de Análise e Desenvolvimento de Sistemas
Desenvolvedor Back-End
