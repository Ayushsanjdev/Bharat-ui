import { describe, expect, test } from "bun:test";
import { validateIFSC } from "./ifsc.js";

describe("validateIFSC", () => {
  test("validates a known IFSC", () => {
    const result = validateIFSC("SBIN0001234");
    expect(result.valid).toBe(true);
    expect(result.meta?.bank).toBe("State Bank of India");
    expect(result.meta?.city).toBe("Vadodara");
  });

  test("converts lowercase to uppercase", () => {
    const result = validateIFSC("sbin0001234");
    expect(result.valid).toBe(true);
  });

  test("rejects wrong length", () => {
    const result = validateIFSC("SBIN001");
    expect(result.valid).toBe(false);
    expect(result.error).toBe("IFSC must be 11 characters");
  });

  test("rejects invalid format", () => {
    const result = validateIFSC("1234567890A");
    expect(result.valid).toBe(false);
    expect(result.error).toBe("Invalid IFSC format");
  });

  test("rejects unknown IFSC", () => {
    const result = validateIFSC("SBIN0099999");
    expect(result.valid).toBe(false);
    expect(result.error).toBe("IFSC not found in RBI database");
  });

  test("returns full branch meta", () => {
    const result = validateIFSC("HDFC0001234");
    expect(result.meta?.branch).toBe("Vadodara");
    expect(result.meta?.state).toBe("Gujarat");
    expect(result.meta?.code).toBe("HDFC0001234");
  });
});
