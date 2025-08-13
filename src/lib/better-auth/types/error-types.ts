import { betterAuthClient } from "../auth-client";

export type LanguageTypes = "en";

export type ErrorTypes = Partial<
  Record<
    keyof typeof betterAuthClient.$ERROR_CODES,
    Record<LanguageTypes, string>
  >
>;
