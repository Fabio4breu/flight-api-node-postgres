"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
class BaseRepository {
    constructor(db) {
        this.db = db;
    }
    async queryMany(sql, params = []) {
        const r = await this.db.query(sql, params);
        return r.rows;
    }
    async queryOne(sql, params = []) {
        const r = await this.db.query(sql, params);
        return r.rows[0] ?? null;
    }
}
exports.BaseRepository = BaseRepository;
