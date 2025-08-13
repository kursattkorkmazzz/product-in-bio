import { betterAuth } from "better-auth";
import { v4 as uuidv4 } from "uuid";
import { Pool } from "pg";
import { DataTypes } from "sequelize";
export const auth = betterAuth({
  database: new Pool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432", 10),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: false,
  }),

  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    maxPasswordLength: 64,
    autoSignIn: true,
    requireEmailVerification: true,
    revokeSessionsOnPasswordReset: true,
    resetPasswordTokenExpiresIn: 300, // 5 minutes
  },
  advanced: {
    cookiePrefix: "product-in-bio",
    useSecureCookies: true, // Use secure cookies in both production and development. If false, cookies will not be secure in development, just production.
    database: {
      generateId: () => uuidv4(),
    },
  },

  user: {
    additionalFields: {
      lang: {
        type: "string",
        defaultValue: "en",
        fieldName: "lang",
        required: true,
      },
    },
  },
});
