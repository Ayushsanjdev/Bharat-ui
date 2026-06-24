import { describe, expect, test } from "bun:test";
import { validatePAN } from "./pan.js";

describe("validatePAN", () => {
  test("validates a correct individual PAN", () => {
    const result = validatePAN("ABCPE1234F");
    expect(result.valid).toBe(true);
    expect(result.meta?.type).toBe("Individual");
    expect(result.meta?.typeCode).toBe("P");
  });

  test("validates a company PAN", () => {
    const result = validatePAN("AABCE1234F");
    expect(result.valid).toBe(true);
    expect(result.meta?.type).toBe("Company");
  });

  test("converts lowercase to uppercase", () => {
    const result = validatePAN("abcpe1234f");
    expect(result.valid).toBe(true);
    expect(result.formatted).toBe("ABCPE1234F");
  });

  test("rejects invalid length", () => {
    const result = validatePAN("ABCPE123");
    expect(result.valid).toBe(false);
    expect(result.error).toBe("PAN must be 10 characters");
  });

  test("rejects invalid type character", () => {
    const result = validatePAN("ABCZE1234F");
    expect(result.valid).toBe(false);
    expect(result.error).toBe("Invalid PAN format");
  });

  test("rejects wrong format", () => {
    const result = validatePAN("1234PE1234F");
    expect(result.valid).toBe(false);
  });

  test("strips whitespace before validating", () => {
    const result = validatePAN("ABCPE 1234F");
    expect(result.valid).toBe(true);
  });
});
