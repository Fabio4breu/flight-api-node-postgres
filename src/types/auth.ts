import { UserType } from "./sysUser";

export interface LoginRequest {
  login_email: string;
  password: string;
}

export interface JwtPayload {
  id: number;
  login_email: string;
  user_type: UserType;
}

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    name: string;
    login_email: string;
    user_type: UserType;
  };
}