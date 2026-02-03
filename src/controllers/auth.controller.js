const db = require("../config/db");
const jwt = require("jsonwebtoken");

// caminho A (mais rápido): senha em texto puro (conforme script)
async function login(req, res) {
  try {
    const { login_email, password } = req.body;

    if (!login_email || !password) {
      return res.status(400).json({ error: "login_email e password são obrigatórios" });
    }

    const r = await db.query(
      "SELECT id, login_email, password, user_type, name FROM sys_user WHERE login_email = $1",
      [login_email]
    );

    if (r.rows.length === 0) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    const user = r.rows[0];

    // senha em texto puro (do script)
    if (password !== user.password) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    const token = jwt.sign(
      { id: user.id, login_email: user.login_email, user_type: user.user_type },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
    );

    return res.json({
      token,
      user: { id: user.id, name: user.name, login_email: user.login_email, user_type: user.user_type },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro no login", details: err.message });
  }
}

module.exports = { login };
