import pg from "pg";
import { Sequelize } from "sequelize";

export const DATABASE_INSTANCE = new Sequelize({
  dialect: "postgres",
  dialectModule: pg,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432", 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: false,
});
