import db from "../config/db";
import { BaseRepository } from "./BaseRepository";
import { SysUser, SysUserPublic, CreateSysUserDTO, UpdateSysUserDTO } from "../types/sysUser";

export class SysUserRepository extends BaseRepository {
  constructor() {
    super(db);
  }

  findByEmail(email: string) {
    return this.queryOne<SysUser>(
      "SELECT id, name, login_email, password, user_type FROM sys_user WHERE login_email = $1",
      [email]
    );
  }

  findPublicById(id: number) {
    return this.queryOne<SysUserPublic>(
      "SELECT id, name, login_email, user_type FROM sys_user WHERE id = $1",
      [id]
    );
  }

  listPublic() {
    return this.queryMany<SysUserPublic>(
      "SELECT id, name, login_email, user_type FROM sys_user ORDER BY id"
    );
  }

  create(data: CreateSysUserDTO) {
    return this.queryOne<SysUserPublic>(
      "INSERT INTO sys_user (name, login_email, password, user_type) VALUES ($1,$2,$3,$4) RETURNING id, name, login_email, user_type",
      [data.name, data.login_email, data.password, data.user_type]
    );
  }

  async update(id: number, data: UpdateSysUserDTO, allowUserType: boolean) {
    const fields: string[] = [];
    const values: any[] = [];
    let idx = 1;

    if (data.name) { fields.push(`name = $${idx++}`); values.push(data.name); }
    if (data.login_email) { fields.push(`login_email = $${idx++}`); values.push(data.login_email); }
    if (data.password) { fields.push(`password = $${idx++}`); values.push(data.password); }
    if (allowUserType && data.user_type) { fields.push(`user_type = $${idx++}`); values.push(data.user_type); }

    if (fields.length === 0) return null;

    values.push(id);

    const sql = `UPDATE sys_user SET ${fields.join(", ")} WHERE id = $${idx} RETURNING id, name, login_email, user_type`;
    return this.queryOne<SysUserPublic>(sql, values);
  }

  remove(id: number) {
    return this.queryOne<{ id: number }>(
      "DELETE FROM sys_user WHERE id = $1 RETURNING id",
      [id]
    );
  }
}
