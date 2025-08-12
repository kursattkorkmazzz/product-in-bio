import { drizzle } from "drizzle-orm/node-postgres";

export const db = drizzle(process.env.DATABASE_URL!);

export const DatabaseHealthCheck = async () => {
  await db.execute("SELECT 1");
};

DatabaseHealthCheck();
