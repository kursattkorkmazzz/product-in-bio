import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "postgresql",
  schema: "./src/database/schemas",
  out: "./src/database/migrations",

  dbCredentials: {
    database: "product-in-bio",
    host: "localhost",
    port: 5432,
    password: "adminkursat",
    user: "postgres",
    ssl: false,
  },
  migrations: {
    schema: "public",
  },
});
