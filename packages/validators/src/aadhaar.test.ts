import { describe, expect, test } from "bun:test";
import { validateAadhaar } from "./aadhaar.js";

describe("validateAadhaar", () => {
  test("validates a correct Aadhaar", () => {
    const result = validateAadhaar("234123412346");
    expect(result.valid).toBe(true);
  });

  test("formats with spaces", () => {
    const result = validateAadhaar("234123412346");
    expect(result.formatted).toBe("2341 2341 2346");
  });

  test("returns masked version", () => {
    const result = validateAadhaar("234123412346");
    expect(result.masked).toBe("XXXX XXXX 2346");
  });

  test("accepts spaced input", () => {
    const result = validateAadhaar("2341 2341 2346");
    expect(result.valid).toBe(true);
  });

  test("rejects non-12 digits", () => {
    const result = validateAadhaar("12345678");
    expect(result.valid).toBe(false);
    expect(result.error).toBe("Aadhaar must be 12 digits");
  });

  test("rejects invalid checksum", () => {
    const result = validateAadhaar("234123412345");
    expect(result.valid).toBe(false);
    expect(result.error).toBe("Invalid Aadhaar number");
  });

  test("rejects letters", () => {
    const result = validateAadhaar("ABCD12341234");
    expect(result.valid).toBe(false);
  });
});
