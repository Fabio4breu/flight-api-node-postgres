"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SysUserService = void 0;
class SysUserService {
    constructor(repo) {
        this.repo = repo;
    }
    isAdmin(user) {
        return user?.user_type === "admin";
    }
    isSelf(user, targetId) {
        return Number(user?.id) === Number(targetId);
    }
    async list(currentUser) {
        if (!this.isAdmin(currentUser))
            throw new Error("FORBIDDEN_ADMIN_ONLY");
        return this.repo.listPublic();
    }
    async getById(currentUser, id) {
        if (!this.isAdmin(currentUser) && !this.isSelf(currentUser, id)) {
            throw new Error("FORBIDDEN_SELF_ONLY");
        }
        const u = await this.repo.findPublicById(id);
        if (!u)
            throw new Error("NOT_FOUND");
        return u;
    }
    async create(currentUser, data) {
        if (!this.isAdmin(currentUser))
            throw new Error("FORBIDDEN_ADMIN_ONLY");
        return this.repo.create(data);
    }
    async update(currentUser, id, data) {
        const admin = this.isAdmin(currentUser);
        const self = this.isSelf(currentUser, id);
        if (!admin && !self)
            throw new Error("FORBIDDEN_SELF_ONLY");
        if (!admin && data.user_type)
            throw new Error("FORBIDDEN_CHANGE_ROLE");
        const updated = await this.repo.update(id, data, admin);
        if (!updated)
            throw new Error("NOT_FOUND_OR_NO_FIELDS");
        return updated;
    }
    async remove(currentUser, id) {
        if (!this.isAdmin(currentUser))
            throw new Error("FORBIDDEN_ADMIN_ONLY");
        const deleted = await this.repo.remove(id);
        if (!deleted)
            throw new Error("NOT_FOUND");
        return deleted;
    }
}
exports.SysUserService = SysUserService;
