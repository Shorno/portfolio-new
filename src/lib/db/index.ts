import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL || process.env.DATABSE_URL || "";

if (!connectionString) {
  console.warn("WARNING: Database connection string (DATABASE_URL or DATABSE_URL) is not set.");
}

const pool = new Pool({ connectionString });

export const db = drizzle({ client: pool, schema });
export { schema };
