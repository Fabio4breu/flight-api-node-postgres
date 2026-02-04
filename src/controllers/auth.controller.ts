import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";
import { SysUserRepository } from "../repositories/SysUserRepository";
import { LoginRequest } from "../types/auth";

const service = new AuthService(new SysUserRepository());

export async function login(req: Request, res: Response) {
  try {
    const body = req.body as LoginRequest;

    if (!body.login_email || !body.password) {
      return res.status(400).json({ error: "login_email e password são obrigatórios" });
    }

    const result = await service.login(body);
    return res.json(result);
  } catch (err: any) {
    return res.status(401).json({ error: err.message || "Erro no login" });
  }
}
