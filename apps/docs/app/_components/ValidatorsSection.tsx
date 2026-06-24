"use client";

import { useIsMobile } from "./useIsMobile";

const VALIDATOR_CARDS = [
  {
    icon: "🪪",
    title: "Aadhaar",
    desc: "12-digit with Verhoeff checksum. Returns masked version for privacy.",
    tag: "validateAadhaar()",
  },
  {
    icon: "📋",
    title: "PAN",
    desc: "Format + taxpayer type inference — Individual, Company, Trust and more.",
    tag: "validatePAN()",
  },
  {
    icon: "🏦",
    title: "IFSC",
    desc: "Format validation — 4 letters, 0, 6 alphanumeric. Pass a resolver to IFSCInput for bank and branch metadata.",
    tag: "validateIFSC()",
  },
  {
    icon: "📮",
    title: "Pincode",
    desc: "Format validation — 6 digits, non-zero start. Pass a resolver to PincodeInput for district, state, and zone.",
    tag: "validatePincode()",
  },
  {
    icon: "₹",
    title: "INR format",
    desc: "Indian commas, lakh and crore notation. ₹12,34,567 not ₹1,234,567.",
    tag: "formatINR()",
  },
  {
    icon: "✦",
    title: "More in v0.2.0",
    desc: "GST, UPI ID, Vehicle registration, Indian mobile inference.",
    tag: "coming soon",
    accent: true,
  },
];

export function ValidatorsSection() {
  const isMobile = useIsMobile();

  return (
    <section
      id="validators"
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
          @bharat-ui/validators
        </div>
        <h2
          style={{
            fontSize: isMobile ? 22 : 28,
            fontWeight: 700,
            color: "var(--text)",
            marginBottom: 8,
            letterSpacing: "-0.01em",
          }}
        >
          Every Indian data format, validated
        </h2>
        <p style={{ fontSize: 14, color: "var(--text-dim)", marginBottom: 32 }}>
          Zero dependencies. TypeScript-first. Works in React, React Native, and Node.js.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(3, 1fr)",
            gap: 12,
          }}
        >
          {VALIDATOR_CARDS.map((c) => (
            <div
              key={c.title}
              style={{
                background: c.accent ? "var(--surface-accent)" : "var(--surface)",
                border: `0.5px solid ${c.accent ? "var(--accent-dim)" : "var(--border)"}`,
                borderRadius: 12,
                padding: isMobile ? 16 : 20,
              }}
            >
              <div style={{ fontSize: 20, marginBottom: 10 }}>{c.icon}</div>
              <div
                style={{
                  fontSize: isMobile ? 13 : 14,
                  fontWeight: 600,
                  color: c.accent ? "var(--accent)" : "var(--text)",
                  marginBottom: 4,
                }}
              >
                {c.title}
              </div>
              <div style={{ fontSize: 12, color: "var(--text-dim)", lineHeight: 1.6, marginBottom: 10 }}>
                {c.desc}
              </div>
              <code
                style={{
                  fontSize: 10,
                  padding: "2px 6px",
                  borderRadius: 4,
                  background: "var(--accent-bg)",
                  color: "var(--accent)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {c.tag}
              </code>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
