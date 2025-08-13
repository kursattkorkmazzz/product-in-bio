import { LanguageTypes as LT } from "@/database/models/user";
import { betterAuthClient } from "../auth-client";

export type LanguageTypes = keyof typeof LT;
export type ErrorTypes = Partial<
  Record<
    keyof typeof betterAuthClient.$ERROR_CODES,
    Record<LanguageTypes, string>
  >
>;
