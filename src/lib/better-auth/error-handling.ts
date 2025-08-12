import { ErrorTypes, LanguageTypes } from "./types/error-types";

const errorCodes = {
  USER_ALREADY_EXISTS: {
    en: "User already registered.",
  },
} satisfies ErrorTypes;

const getErrorMessage = (code: string, lang: LanguageTypes) => {
  if (code in errorCodes) {
    return errorCodes[code as keyof typeof errorCodes][lang];
  }
  return "";
};
