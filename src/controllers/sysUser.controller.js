const db = require("../config/db");

function isAdmin(req) {
  return req.user?.user_type === "admin";
}

function isSelf(req, id) {
  return Number(req.user?.id) === Number(id);
}

// GET /sys-user (admin)
async function list(req, res) {
  if (!isAdmin(req)) {
    return res.status(403).json({ error: "Apenas admin pode listar usuários" });
  }
  const r = await db.query("SELECT id, name, login_email, user_type FROM sys_user ORDER BY id");
  return res.json(r.rows);
}

// GET /sys-user/:id (admin ou o próprio)
async function getById(req, res) {
  const { id } = req.params;

  if (!isAdmin(req) && !isSelf(req, id)) {
    return res.status(403).json({ error: "Você só pode ver seus próprios dados" });
  }

  const r = await db.query("SELECT id, name, login_email, user_type FROM sys_user WHERE id = $1", [id]);

  if (r.rows.length === 0) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }

  return res.json(r.rows[0]);
}

// POST /sys-user (admin)
async function create(req, res) {
  if (!isAdmin(req)) {
    return res.status(403).json({ error: "Apenas admin pode criar usuários" });
  }

  const { name, login_email, password, user_type } = req.body;

  if (!name || !login_email || !password || !user_type) {
    return res.status(400).json({ error: "name, login_email, password e user_type são obrigatórios" });
  }

  const r = await db.query(
    "INSERT INTO sys_user (name, login_email, password, user_type) VALUES ($1,$2,$3,$4) RETURNING id, name, login_email, user_type",
    [name, login_email, password, user_type]
  );

  return res.status(201).json(r.rows[0]);
}

// PUT /sys-user/:id (admin ou o próprio; regular não muda user_type)
async function update(req, res) {
  const { id } = req.params;
  const { name, login_email, password, user_type } = req.body;

  if (!isAdmin(req) && !isSelf(req, id)) {
    return res.status(403).json({ error: "Você só pode alterar seus próprios dados" });
  }

  if (!isAdmin(req) && user_type) {
    return res.status(403).json({ error: "Usuário regular não pode alterar user_type" });
  }

  // update dinâmico
  const fields = [];
  const values = [];
  let idx = 1;

  if (name) { fields.push(`name = $${idx++}`); values.push(name); }
  if (login_email) { fields.push(`login_email = $${idx++}`); values.push(login_email); }
  if (password) { fields.push(`password = $${idx++}`); values.push(password); }
  if (isAdmin(req) && user_type) { fields.push(`user_type = $${idx++}`); values.push(user_type); }

  if (fields.length === 0) {
    return res.status(400).json({ error: "Nada para atualizar" });
  }

  values.push(id);

  const r = await db.query(
    `UPDATE sys_user SET ${fields.join(", ")} WHERE id = $${idx} RETURNING id, name, login_email, user_type`,
    values
  );

  if (r.rows.length === 0) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }

  return res.json(r.rows[0]);
}

// DELETE /sys-user/:id (admin)
async function remove(req, res) {
  if (!isAdmin(req)) {
    return res.status(403).json({ error: "Apenas admin pode deletar usuários" });
  }

  const { id } = req.params;
  const r = await db.query("DELETE FROM sys_user WHERE id = $1 RETURNING id", [id]);

  if (r.rows.length === 0) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }

  return res.json({ message: "Usuário deletado" });
}

module.exports = { list, getById, create, update, remove };
