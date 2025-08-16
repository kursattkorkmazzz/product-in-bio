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
    requireEmailVerification: false,
    revokeSessionsOnPasswordReset: true,
    resetPasswordTokenExpiresIn: 300, // 5 minutes
  },
  advanced: {
    cookiePrefix: "product-in-bio",
    useSecureCookies: process.env.NODE_ENV === "production",
  },
  trustedOrigins: [process.env.FRONTEND_URL || "", "http://192.168.1.5:3000"], // Geliştirme ortamı için
});
