export interface PincodeResult {
  valid: boolean;
  formatted: string;
  error?: string;
}

export function validatePincode(value: string): PincodeResult {
  const cleaned = value.replace(/\s/g, "");

  if (!/^\d{6}$/.test(cleaned)) {
    return { valid: false, formatted: "", error: "Pincode must be 6 digits" };
  }

  if (cleaned.startsWith("0")) {
    return { valid: false, formatted: "", error: "Pincode cannot start with 0" };
  }

  return { valid: true, formatted: cleaned };
}
