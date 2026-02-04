"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SysUserRepository = void 0;
const db_1 = __importDefault(require("../config/db"));
const BaseRepository_1 = require("./BaseRepository");
class SysUserRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super(db_1.default);
    }
    findByEmail(email) {
        return this.queryOne("SELECT id, name, login_email, password, user_type FROM sys_user WHERE login_email = $1", [email]);
    }
    findPublicById(id) {
        return this.queryOne("SELECT id, name, login_email, user_type FROM sys_user WHERE id = $1", [id]);
    }
    listPublic() {
        return this.queryMany("SELECT id, name, login_email, user_type FROM sys_user ORDER BY id");
    }
    create(data) {
        return this.queryOne("INSERT INTO sys_user (name, login_email, password, user_type) VALUES ($1,$2,$3,$4) RETURNING id, name, login_email, user_type", [data.name, data.login_email, data.password, data.user_type]);
    }
    async update(id, data, allowUserType) {
        const fields = [];
        const values = [];
        let idx = 1;
        if (data.name) {
            fields.push(`name = $${idx++}`);
            values.push(data.name);
        }
        if (data.login_email) {
            fields.push(`login_email = $${idx++}`);
            values.push(data.login_email);
        }
        if (data.password) {
            fields.push(`password = $${idx++}`);
            values.push(data.password);
        }
        if (allowUserType && data.user_type) {
            fields.push(`user_type = $${idx++}`);
            values.push(data.user_type);
        }
        if (fields.length === 0)
            return null;
        values.push(id);
        const sql = `UPDATE sys_user SET ${fields.join(", ")} WHERE id = $${idx} RETURNING id, name, login_email, user_type`;
        return this.queryOne(sql, values);
    }
    remove(id) {
        return this.queryOne("DELETE FROM sys_user WHERE id = $1 RETURNING id", [id]);
    }
}
exports.SysUserRepository = SysUserRepository;
