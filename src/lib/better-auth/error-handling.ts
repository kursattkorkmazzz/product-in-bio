import { BetterFetchError } from "better-auth/react";
import { ErrorTypes, LanguageTypes } from "./types/error-types";

const errorCodes = {
  USER_NOT_FOUND: {
    en: "User not found",
  },
  FAILED_TO_CREATE_USER: {
    en: "Failed to create user",
  },
  FAILED_TO_CREATE_SESSION: {
    en: "Failed to create session",
  },
  FAILED_TO_UPDATE_USER: {
    en: "Failed to update user",
  },
  FAILED_TO_GET_SESSION: {
    en: "Failed to get session",
  },
  INVALID_PASSWORD: {
    en: "Invalid password",
  },
  INVALID_EMAIL: {
    en: "Invalid email",
  },
  INVALID_EMAIL_OR_PASSWORD: {
    en: "Invalid email or password",
  },
  SOCIAL_ACCOUNT_ALREADY_LINKED: {
    en: "Social account already linked",
  },
  PROVIDER_NOT_FOUND: {
    en: "Provider not found",
  },
  INVALID_TOKEN: {
    en: "invalid token",
  },
  ID_TOKEN_NOT_SUPPORTED: {
    en: "id_token not supported",
  },
  FAILED_TO_GET_USER_INFO: {
    en: "Failed to get user info",
  },
  USER_EMAIL_NOT_FOUND: {
    en: "User email not found",
  },
  EMAIL_NOT_VERIFIED: {
    en: "Email not verified",
  },
  PASSWORD_TOO_SHORT: {
    en: "Password too short",
  },
  PASSWORD_TOO_LONG: {
    en: "Password too long",
  },
  USER_ALREADY_EXISTS: {
    en: "User already exists. Use another email.",
  },
  EMAIL_CAN_NOT_BE_UPDATED: {
    en: "Email can not be updated",
  },
  CREDENTIAL_ACCOUNT_NOT_FOUND: {
    en: "Credential account not found",
  },
  SESSION_EXPIRED: {
    en: "Session expired. Re-authenticate to perform this action.",
  },
  FAILED_TO_UNLINK_LAST_ACCOUNT: {
    en: "You can't unlink your last account",
  },
  ACCOUNT_NOT_FOUND: {
    en: "Account not found",
  },
  USER_ALREADY_HAS_PASSWORD: {
    en: "User already has a password. Provide that to delete the account.",
  },
} satisfies ErrorTypes;

export const getErrorMessage = (
  error: BetterFetchError & Record<string, any>,
  lang: LanguageTypes = "en"
) => {
  if (error.code in errorCodes) {
    return errorCodes[error.code as keyof typeof errorCodes][lang];
  }
  //TODO: Log error details to solve.
  return "An unexpected error occurred. Please try again later.";
};
