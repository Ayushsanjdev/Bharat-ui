const PAN_REGEX = /^[A-Z]{3}[PCHFABGJLT][A-Z]\d{4}[A-Z]$/;

const PAN_TYPE_MAP: Record<string, string> = {
  P: "Individual",
  C: "Company",
  H: "Hindu Undivided Family",
  F: "Firm",
  A: "Association of Persons",
  B: "Body of Individuals",
  G: "Government",
  J: "Artificial Juridical Person",
  L: "Local Authority",
  T: "Trust",
};

export interface PANResult {
  valid: boolean;
  formatted: string;
  error?: string;
  meta?: {
    type: string;
    typeCode: string;
  };
}

export function validatePAN(value: string): PANResult {
  const cleaned = value.toUpperCase().replace(/\s/g, "");

  if (cleaned.length !== 10) {
    return { valid: false, formatted: "", error: "PAN must be 10 characters" };
  }

  if (!PAN_REGEX.test(cleaned)) {
    return { valid: false, formatted: "", error: "Invalid PAN format" };
  }

  const typeCode = cleaned[3] as string;
  const type = PAN_TYPE_MAP[typeCode] as string;

  return {
    valid: true,
    formatted: cleaned,
    meta: { type, typeCode },
  };
}
