import { ErrorTypes, LanguageTypes } from "./types/error-types";

const errorCodes = {
  USER_ALREADY_EXISTS: {
    EN: "User already registered.",
  },
} satisfies ErrorTypes;

export const getErrorMessage = (code?: string, lang: LanguageTypes = "EN") => {
  if (code && code in errorCodes) {
    return errorCodes[code as keyof typeof errorCodes][lang];
  }
  return "";
};
