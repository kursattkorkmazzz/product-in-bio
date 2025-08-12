import { languageEnum } from "@/database/schemas/user";
import { betterAuthClient } from "../auth-client";

export type LanguageTypes = keyof typeof languageEnum.enumValues;

export type ErrorTypes = Partial<
  Record<
    keyof typeof betterAuthClient.$ERROR_CODES,
    Record<LanguageTypes, string>
  >
>;
