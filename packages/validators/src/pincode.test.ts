import { describe, expect, test } from "bun:test";
import { validatePincode } from "./pincode.js";

describe("validatePincode", () => {
  test("validates a known pincode", () => {
    const result = validatePincode("390001");
    expect(result.valid).toBe(true);
    expect(result.meta?.district).toBe("Vadodara");
    expect(result.meta?.state).toBe("Gujarat");
  });

  test("validates Begusarai pincode", () => {
    const result = validatePincode("851101");
    expect(result.valid).toBe(true);
    expect(result.meta?.district).toBe("Begusarai");
    expect(result.meta?.state).toBe("Bihar");
  });

  test("rejects non-6 digits", () => {
    const result = validatePincode("3900");
    expect(result.valid).toBe(false);
    expect(result.error).toBe("Pincode must be 6 digits");
  });

  test("rejects pincode starting with 0", () => {
    const result = validatePincode("012345");
    expect(result.valid).toBe(false);
    expect(result.error).toBe("Pincode cannot start with 0");
  });

  test("rejects unknown pincode", () => {
    const result = validatePincode("999999");
    expect(result.valid).toBe(false);
    expect(result.error).toBe("Pincode not found");
  });

  test("returns zone and head PO", () => {
    const result = validatePincode("110001");
    expect(result.meta?.zone).toBe("Northern");
    expect(result.meta?.headPO).toBe("Delhi GPO");
  });
});
