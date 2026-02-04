import { Request, Response } from "express";
import { SysUserRepository } from "../repositories/SysUserRepository";
import { SysUserService } from "../services/SysUserService";
import { CreateSysUserDTO, UpdateSysUserDTO } from "../types/sysUser";

const service = new SysUserService(new SysUserRepository());

function mapError(res: Response, err: any) {
  const msg = String(err?.message || err);

  if (msg === "FORBIDDEN_ADMIN_ONLY") return res.status(403).json({ error: "Apenas admin pode executar esta ação" });
  if (msg === "FORBIDDEN_SELF_ONLY") return res.status(403).json({ error: "Você só pode acessar/alterar seus dados" });
  if (msg === "FORBIDDEN_CHANGE_ROLE") return res.status(403).json({ error: "Usuário regular não pode alterar user_type" });
  if (msg === "NOT_FOUND") return res.status(404).json({ error: "Usuário não encontrado" });
  if (msg === "NOT_FOUND_OR_NO_FIELDS") return res.status(400).json({ error: "Nada para atualizar ou usuário não encontrado" });

  return res.status(500).json({ error: "Erro interno", details: msg });
}

export async function list(req: Request, res: Response) {
  try {
    const users = await service.list(req.user);
    return res.json(users);
  } catch (err: any) {
    return mapError(res, err);
  }
}

export async function getById(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const user = await service.getById(req.user, id);
    return res.json(user);
  } catch (err: any) {
    return mapError(res, err);
  }
}

export async function create(req: Request, res: Response) {
  try {
    const body = req.body as CreateSysUserDTO;
    const created = await service.create(req.user, body);
    return res.status(201).json(created);
  } catch (err: any) {
    return mapError(res, err);
  }
}

export async function update(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const body = req.body as UpdateSysUserDTO;
    const updated = await service.update(req.user, id, body);
    return res.json(updated);
  } catch (err: any) {
    return mapError(res, err);
  }
}

export async function remove(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    await service.remove(req.user, id);
    return res.json({ message: "Usuário deletado" });
  } catch (err: any) {
    return mapError(res, err);
  }
}
