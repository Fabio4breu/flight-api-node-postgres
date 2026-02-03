const db = require("../config/db");

async function list(req, res) {
  try {
    const r = await db.query("SELECT * FROM boarding_pass ORDER BY boarding_pass_id LIMIT 200");
    return res.json(r.rows);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro ao consultar boarding_pass", details: err.message });
  }
}

module.exports = { list };
