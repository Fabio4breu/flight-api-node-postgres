import { SysUserRepository } from "../repositories/SysUserRepository";
import { CreateSysUserDTO, UpdateSysUserDTO } from "../types/sysUser";
import { JwtPayload } from "../types/auth";

export class SysUserService {
  constructor(private repo: SysUserRepository) {}

  private isAdmin(user?: JwtPayload) {
    return user?.user_type === "admin";
  }

  private isSelf(user?: JwtPayload, targetId?: number) {
    return Number(user?.id) === Number(targetId);
  }

  async list(currentUser?: JwtPayload) {
    if (!this.isAdmin(currentUser)) throw new Error("FORBIDDEN_ADMIN_ONLY");
    return this.repo.listPublic();
  }

  async getById(currentUser: JwtPayload | undefined, id: number) {
    if (!this.isAdmin(currentUser) && !this.isSelf(currentUser, id)) {
      throw new Error("FORBIDDEN_SELF_ONLY");
    }
    const u = await this.repo.findPublicById(id);
    if (!u) throw new Error("NOT_FOUND");
    return u;
  }

  async create(currentUser: JwtPayload | undefined, data: CreateSysUserDTO) {
    if (!this.isAdmin(currentUser)) throw new Error("FORBIDDEN_ADMIN_ONLY");
    return this.repo.create(data);
  }

  async update(currentUser: JwtPayload | undefined, id: number, data: UpdateSysUserDTO) {
    const admin = this.isAdmin(currentUser);
    const self = this.isSelf(currentUser, id);

    if (!admin && !self) throw new Error("FORBIDDEN_SELF_ONLY");
    if (!admin && data.user_type) throw new Error("FORBIDDEN_CHANGE_ROLE");

    const updated = await this.repo.update(id, data, admin);
    if (!updated) throw new Error("NOT_FOUND_OR_NO_FIELDS");
    return updated;
  }

  async remove(currentUser: JwtPayload | undefined, id: number) {
    if (!this.isAdmin(currentUser)) throw new Error("FORBIDDEN_ADMIN_ONLY");
    const deleted = await this.repo.remove(id);
    if (!deleted) throw new Error("NOT_FOUND");
    return deleted;
  }
}
