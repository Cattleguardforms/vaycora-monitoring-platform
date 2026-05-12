import { Pool } from "pg";

let pool: Pool | undefined;

function shouldUseSsl(connectionString: string) {
  return !connectionString.includes("localhost") && !connectionString.includes("127.0.0.1");
}

function normalizeConnectionString(connectionString: string) {
  const parsed = new URL(connectionString);

  // The pg driver can let sslmode=require override the explicit ssl object below.
  // DigitalOcean's CA can appear self-signed to Node, so we remove sslmode and
  // set SSL behavior directly in the Pool config.
  parsed.searchParams.delete("sslmode");
  parsed.searchParams.delete("sslcert");
  parsed.searchParams.delete("sslkey");
  parsed.searchParams.delete("sslrootcert");

  return parsed.toString();
}

export function getPool() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not configured.");
  }

  if (!pool) {
    const useSsl = shouldUseSsl(databaseUrl);

    pool = new Pool({
      connectionString: normalizeConnectionString(databaseUrl),
      ssl: useSsl ? { rejectUnauthorized: false } : false,
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
