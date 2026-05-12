import { Pool } from "pg";

let pool: Pool | undefined;

export function getPool() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not configured.");
  }

  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_URL.includes("sslmode=require")
        ? undefined
        : { rejectUnauthorized: false },
    });
  }

  return pool;
}

export async function query<T = unknown>(sql: string, params: unknown[] = []) {
  const result = await getPool().query(sql, params);
  return result.rows as T[];
}

export async function queryOne<T = unknown>(sql: string, params: unknown[] = []) {
  const rows = await query<T>(sql, params);
  return rows[0] ?? null;
}
