import { describe, expect, test } from "bun:test";
import { formatINR, formatINRCompact, parseINR } from "./format.js";

describe("formatINR", () => {
  test("formats with Indian comma system", () => {
    expect(formatINR(1234567)).toBe("₹12,34,567");
  });

  test("handles hundreds", () => {
    expect(formatINR(999)).toBe("₹999");
  });

  test("handles thousands", () => {
    expect(formatINR(10000)).toBe("₹10,000");
  });

  test("handles lakhs", () => {
    expect(formatINR(100000)).toBe("₹1,00,000");
  });

  test("handles crores", () => {
    expect(formatINR(10000000)).toBe("₹1,00,00,000");
  });
});

describe("formatINRCompact", () => {
  test("shows lakh notation", () => {
    expect(formatINRCompact(1234567)).toBe("₹12.35L");
  });

  test("shows crore notation", () => {
    expect(formatINRCompact(10000000)).toBe("₹1Cr");
  });

  test("shows crore with decimal", () => {
    expect(formatINRCompact(15000000)).toBe("₹1.5Cr");
  });

  test("falls back to full format below 1L", () => {
    expect(formatINRCompact(50000)).toBe("₹50,000");
  });
});

describe("parseINR", () => {
  test("strips symbol and commas", () => {
    expect(parseINR("₹12,34,567")).toBe(1234567);
  });

  test("handles plain number string", () => {
    expect(parseINR("1000")).toBe(1000);
  });
});
