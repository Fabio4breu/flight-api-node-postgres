import { Request, Response } from "express";
import db from "../config/db";

export async function list(req: Request, res: Response) {
  try {
    const r = await db.query("SELECT * FROM passenger ORDER BY passenger_id LIMIT 200");
    return res.json(r.rows);
  } catch (err: any) {
    return res.status(500).json({ error: "Erro ao consultar passenger", details: err.message });
  }
}
