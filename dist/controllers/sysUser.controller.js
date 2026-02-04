"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.list = list;
exports.getById = getById;
exports.create = create;
exports.update = update;
exports.remove = remove;
const SysUserRepository_1 = require("../repositories/SysUserRepository");
const SysUserService_1 = require("../services/SysUserService");
const service = new SysUserService_1.SysUserService(new SysUserRepository_1.SysUserRepository());
function mapError(res, err) {
    const msg = String(err?.message || err);
    if (msg === "FORBIDDEN_ADMIN_ONLY")
        return res.status(403).json({ error: "Apenas admin pode executar esta ação" });
    if (msg === "FORBIDDEN_SELF_ONLY")
        return res.status(403).json({ error: "Você só pode acessar/alterar seus dados" });
    if (msg === "FORBIDDEN_CHANGE_ROLE")
        return res.status(403).json({ error: "Usuário regular não pode alterar user_type" });
    if (msg === "NOT_FOUND")
        return res.status(404).json({ error: "Usuário não encontrado" });
    if (msg === "NOT_FOUND_OR_NO_FIELDS")
        return res.status(400).json({ error: "Nada para atualizar ou usuário não encontrado" });
    return res.status(500).json({ error: "Erro interno", details: msg });
}
async function list(req, res) {
    try {
        const users = await service.list(req.user);
        return res.json(users);
    }
    catch (err) {
        return mapError(res, err);
    }
}
async function getById(req, res) {
    try {
        const id = Number(req.params.id);
        const user = await service.getById(req.user, id);
        return res.json(user);
    }
    catch (err) {
        return mapError(res, err);
    }
}
async function create(req, res) {
    try {
        const body = req.body;
        const created = await service.create(req.user, body);
        return res.status(201).json(created);
    }
    catch (err) {
        return mapError(res, err);
    }
}
async function update(req, res) {
    try {
        const id = Number(req.params.id);
        const body = req.body;
        const updated = await service.update(req.user, id, body);
        return res.json(updated);
    }
    catch (err) {
        return mapError(res, err);
    }
}
async function remove(req, res) {
    try {
        const id = Number(req.params.id);
        await service.remove(req.user, id);
        return res.json({ message: "Usuário deletado" });
    }
    catch (err) {
        return mapError(res, err);
    }
}
