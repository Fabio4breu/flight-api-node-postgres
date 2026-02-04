"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = login;
const AuthService_1 = require("../services/AuthService");
const SysUserRepository_1 = require("../repositories/SysUserRepository");
const service = new AuthService_1.AuthService(new SysUserRepository_1.SysUserRepository());
async function login(req, res) {
    try {
        const body = req.body;
        if (!body.login_email || !body.password) {
            return res.status(400).json({ error: "login_email e password são obrigatórios" });
        }
        const result = await service.login(body);
        return res.json(result);
    }
    catch (err) {
        return res.status(401).json({ error: err.message || "Erro no login" });
    }
}
