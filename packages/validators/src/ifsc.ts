import { IFSC_DATA } from "@bharat-ui/data/ifsc";
import type { IFSCEntry } from "@bharat-ui/data/ifsc";

const IFSC_REGEX = /^[A-Z]{4}0[A-Z0-9]{6}$/;

export interface IFSCResult {
  valid: boolean;
  formatted: string;
  error?: string;
  meta?: IFSCEntry & { code: string };
}

export function validateIFSC(value: string): IFSCResult {
  const cleaned = value.toUpperCase().replace(/\s/g, "");

  if (cleaned.length !== 11) {
    return { valid: false, formatted: "", error: "IFSC must be 11 characters" };
  }

  if (!IFSC_REGEX.test(cleaned)) {
    return { valid: false, formatted: "", error: "Invalid IFSC format" };
  }

  const entry = IFSC_DATA[cleaned];

  return {
    valid: true,
    formatted: cleaned,
    ...(entry ? { meta: { code: cleaned, ...entry } } : {}),
  };
}
