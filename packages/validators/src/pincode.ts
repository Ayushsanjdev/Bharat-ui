import { PINCODE_DATA } from "@bharat-ui/data/pincode";
import type { PincodeEntry } from "@bharat-ui/data/pincode";

export interface PincodeResult {
  valid: boolean;
  formatted: string;
  error?: string;
  meta?: PincodeEntry & { pincode: string };
}

export function validatePincode(value: string): PincodeResult {
  const cleaned = value.replace(/\s/g, "");

  if (!/^\d{6}$/.test(cleaned)) {
    return { valid: false, formatted: "", error: "Pincode must be 6 digits" };
  }

  if (cleaned.startsWith("0")) {
    return {
      valid: false,
      formatted: "",
      error: "Pincode cannot start with 0",
    };
  }

  const entry = PINCODE_DATA[cleaned];

  return {
    valid: true,
    formatted: cleaned,
    ...(entry ? { meta: { pincode: cleaned, ...entry } } : {}),
  };
}
