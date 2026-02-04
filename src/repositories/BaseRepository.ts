import { Pool } from "pg";

export class BaseRepository {
  constructor(protected db: Pool) {}

  async queryMany<T>(sql: string, params: unknown[] = []): Promise<T[]> {
    const r = await this.db.query(sql, params);
    return r.rows as T[];
  }

  async queryOne<T>(sql: string, params: unknown[] = []): Promise<T | null> {
    const r = await this.db.query(sql, params);
    return (r.rows[0] as T) ?? null;
  }
}
