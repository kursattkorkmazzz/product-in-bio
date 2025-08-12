import { db } from "@/database/db";
import { account } from "@/database/schemas/account";
import { session } from "@/database/schemas/session";
import { user } from "@/database/schemas/user";
import { verification } from "@/database/schemas/verification";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    camelCase: true,
    usePlural: false,
    debugLogs: false,
    schema: {
      user: user,
      account: account,
      session: session,
      verification: verification,
    },
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
