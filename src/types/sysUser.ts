export enum UserType {
  ADMIN = "admin",
  REGULAR = "regular"
}

export interface SysUser {
  id: number;
  name: string;
  login_email: string;
  password: string;
  user_type: UserType;
}

export interface SysUserPublic {
  id: number;
  name: string;
  login_email: string;
  user_type: UserType;
}

export interface CreateSysUserDTO {
  name: string;
  login_email: string;
  password: string;
  user_type: UserType;
}

export type UpdateSysUserDTO = Partial<CreateSysUserDTO>;