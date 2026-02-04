import jwt, { SignOptions, Secret } from "jsonwebtoken";
import { LoginRequest, LoginResponse } from "../types/auth";
import { SysUserRepository } from "../repositories/SysUserRepository";

export class AuthService {
  constructor(private repo: SysUserRepository) {}

  async login(data: LoginRequest): Promise<LoginResponse> {
    const { login_email, password } = data;
    const user = await this.repo.findByEmail(login_email);

    if (!user) throw new Error("Credenciais inválidas");
    if (password !== user.password) throw new Error("Credenciais inválidas");

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

  private createToken(id: number, login_email: string, user_type: string): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET não definido no .env");
  }

  const options: SignOptions = {
    expiresIn: (process.env.JWT_EXPIRES_IN ?? "1h") as SignOptions["expiresIn"],
  };

  return jwt.sign(
    { id, login_email, user_type },
    secret as Secret,
    options
  );
}
}
