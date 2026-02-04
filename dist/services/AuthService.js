"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthService {
    constructor(repo) {
        this.repo = repo;
    }
    async login(data) {
        const { login_email, password } = data;
        const user = await this.repo.findByEmail(login_email);
        if (!user)
            throw new Error("Credenciais inválidas");
        if (password !== user.password)
            throw new Error("Credenciais inválidas");
        const token = this.createToken(user.id, user.login_email, user.user_type);
        return {
            token,
            user: {
                id: user.id,
                name: user.name,
                login_email: user.login_email,
                user_type: user.user_type
            }
        };
    }
    createToken(id, login_email, user_type) {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("JWT_SECRET não definido no .env");
        }
        const options = {
            expiresIn: (process.env.JWT_EXPIRES_IN ?? "1h"),
        };
        return jsonwebtoken_1.default.sign({ id, login_email, user_type }, secret, options);
    }
}
exports.AuthService = AuthService;
