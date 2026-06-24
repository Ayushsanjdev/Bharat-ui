import { PINCODE_DATA, PINCODE_PREFIX } from "@bharat-ui/data/pincode";
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
    return { valid: false, formatted: "", error: "Pincode cannot start with 0" };
  }

  // Tier 1: full dataset match
  const entry = PINCODE_DATA[cleaned];
  if (entry) {
    return { valid: true, formatted: cleaned, meta: { pincode: cleaned, ...entry } };
  }

  // Tier 2: infer state + zone from 2-digit prefix
  const prefix = cleaned.slice(0, 2);
  const prefixEntry = PINCODE_PREFIX[prefix];
  if (prefixEntry) {
    return { valid: true, formatted: cleaned, meta: { pincode: cleaned, ...prefixEntry } };
  }

  // Tier 3: valid format, no data
  return { valid: true, formatted: cleaned };
}
