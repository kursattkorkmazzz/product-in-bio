"use client";
import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
import type { auth } from "./auth";

export const betterAuthClient = createAuthClient({
  plugins: [inferAdditionalFields<typeof auth>()],
});
