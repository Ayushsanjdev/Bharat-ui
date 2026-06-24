"use client";

import { useIsMobile } from "./useIsMobile";

const WHY_ITEMS = [
  {
    title: "Indian number system",
    body: "₹12,34,567 not ₹1,234,567. Lakh and crore notation. Every western library gets this wrong.",
  },
  {
    title: "Indic typography",
    body: "Devanagari vowel marks clip at line-height 1.4. Bharat UI ships correct per-script defaults.",
  },
  {
    title: "Zero network calls",
    body: "Validators are pure format checks — zero data cost. Opt-in bundled resolver (~8KB) for popular metros, or plug in your own API for full coverage.",
  },
  {
    title: "Consistent API",
    body: "Every validator returns { valid, formatted, error?, meta? }. Learn it once, use it everywhere.",
  },
  {
    title: "Tested edge cases",
    body: "37 tests covering real-world inputs — Verhoeff checksums, retired IFSC codes, leading zeros.",
  },
  {
    title: "Tree-shakeable",
    body: "Import only what you need. @bharat-ui/validators has zero runtime dependencies.",
  },
];

export function WhySection() {
  const isMobile = useIsMobile();

  return (
    <section
      id="why"
      style={{
        background: "var(--bg)",
        padding: isMobile ? "48px 20px" : "72px 32px",
        borderBottom: "0.5px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--accent)",
            marginBottom: 8,
          }}
        >
          Why Bharat UI
        </div>
        <h2
          style={{
            fontSize: isMobile ? 22 : 28,
            fontWeight: 700,
            color: "var(--text)",
            marginBottom: 40,
            letterSpacing: "-0.01em",
          }}
        >
          Built for the constraints Indian products actually face
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            gap: isMobile ? 28 : 24,
          }}
        >
          {WHY_ITEMS.map((w) => (
            <div key={w.title}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text)", marginBottom: 6 }}>
                {w.title}
              </div>
              <div style={{ fontSize: 13, color: "var(--text-dim)", lineHeight: 1.7 }}>{w.body}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
