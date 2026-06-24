const D_TABLE = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
  [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
  [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
  [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
  [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
  [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
  [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
  [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
  [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
];

const P_TABLE = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
  [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
  [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
  [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
  [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
  [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
  [7, 0, 4, 6, 9, 1, 3, 2, 5, 8],
];

const INV_TABLE = [0, 4, 3, 2, 1, 5, 6, 7, 8, 9];

function verhoeff(digits: string): boolean {
  let c = 0;
  const arr = digits.split("").reverse();
  for (let i = 0; i < arr.length; i++) {
    const digit = parseInt(arr[i] as string, 10);
    const pVal = (P_TABLE[i % 8] as number[])[digit] as number;
    c = (D_TABLE[c] as number[])[pVal] as number;
  }
  return c === 0;
}

export interface AadhaarResult {
  valid: boolean;
  formatted: string;
  error?: string;
  masked?: string;
}

export function validateAadhaar(value: string): AadhaarResult {
  const digits = value.replace(/\s/g, "");

  if (!/^\d{12}$/.test(digits)) {
    return {
      valid: false,
      formatted: "",
      error: "Aadhaar must be 12 digits",
    };
  }

  if (!verhoeff(digits)) {
    return {
      valid: false,
      formatted: "",
      error: "Invalid Aadhaar number",
    };
  }

  return {
    valid: true,
    formatted: `${digits.slice(0, 4)} ${digits.slice(4, 8)} ${digits.slice(8)}`,
    masked: `XXXX XXXX ${digits.slice(8)}`,
  };
}
