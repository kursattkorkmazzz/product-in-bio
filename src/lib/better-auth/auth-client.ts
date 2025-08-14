"use client";
import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
import type { auth } from "./auth";

export const betterAuthClient = createAuthClient({
  baseURL: process.env.NODE_ENV === "production" 
    ? "https://your-domain.com" 
    : "http://localhost:3002",
  plugins: [inferAdditionalFields<typeof auth>()],
});
