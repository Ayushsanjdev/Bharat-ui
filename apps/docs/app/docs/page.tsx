"use client";

import * as React from "react";
import { Nav } from "../_components/Nav";

const PACKAGES = [
  {
    name: "@bharat-ui/validators",
    install: "npm install @bharat-ui/validators",
    desc: "Zero-dependency, TypeScript-first validators for PAN, Aadhaar, IFSC, Pincode and INR formatting. Works in React, React Native and Node.js.",
    exports: ["validatePAN", "validateAadhaar", "validateIFSC", "validatePincode", "formatINR", "formatINRCompact"],
  },
  {
    name: "@bharat-ui/react",
    install: "npm install @bharat-ui/react",
    desc: "React components that wire up the validators, handle formatting, and manage input state. Requires @bharat-ui/validators.",
    exports: ["AmountInput", "OTPInput", "PANInput", "PincodeInput", "UPIButton"],
  },
];

const API = [
  {
    name: "validatePAN",
    signature: "validatePAN(pan: string): PANResult",
    desc: "Validates a Permanent Account Number. Infers taxpayer type from the 4th character (P = Individual, C = Company, H = HUF, etc.).",
    params: [
      { name: "pan", type: "string", desc: "PAN to validate. Case-insensitive; spaces stripped automatically." },
    ],
    returns: `{
  valid: boolean
  formatted: string         // "ABCPE1234F"
  error?: string
  meta?: {
    type: string            // "Individual" | "Company" | "HUF" | "Firm" | …
    typeCode: string        // "P" | "C" | "H" | "F" | …
  }
}`,
    example: {
      input: 'validatePAN("abcpe1234f")',
      output: '{ valid: true, formatted: "ABCPE1234F", meta: { type: "Individual", typeCode: "P" } }',
    },
  },
  {
    name: "validateAadhaar",
    signature: "validateAadhaar(aadhaar: string): AadhaarResult",
    desc: "Validates a 12-digit Aadhaar number using the Verhoeff checksum algorithm. Returns a masked version for safe display.",
    params: [
      { name: "aadhaar", type: "string", desc: "12 Aadhaar digits. Spaces and hyphens stripped automatically." },
    ],
    returns: `{
  valid: boolean
  formatted: string         // "2341 2341 2346" (empty string on failure)
  masked?: string           // "XXXX XXXX 2346" (only on valid result)
  error?: string
}`,
    example: {
      input: 'validateAadhaar("234123412346")',
      output: '{ valid: true, formatted: "2341 2341 2346", masked: "XXXX XXXX 2346" }',
    },
  },
  {
    name: "validateIFSC",
    signature: "validateIFSC(ifsc: string): IFSCResult",
    desc: "Validates an 11-character IFSC code against the bundled RBI dataset. Returns full bank and branch metadata — no network calls.",
    params: [
      { name: "ifsc", type: "string", desc: "IFSC code. Case-insensitive." },
    ],
    returns: `{
  valid: boolean
  formatted: string         // "SBIN0001234" (empty string on failure)
  error?: string
  meta?: {
    code: string            // "SBIN0001234"
    bank: string
    branch: string
    address: string
    city: string
    state: string
    contact: string
  }
}`,
    example: {
      input: 'validateIFSC("SBIN0001234")',
      output: '{ valid: true, formatted: "SBIN0001234", bank: "State Bank of India", ... }',
    },
  },
  {
    name: "validatePincode",
    signature: "validatePincode(pincode: string): PincodeResult",
    desc: "Validates a 6-digit Indian pincode against the bundled India Post dataset. Returns district, state, zone and head post office — no network calls.",
    params: [
      { name: "pincode", type: "string", desc: "6-digit pincode." },
    ],
    returns: `{
  valid: boolean
  formatted: string         // "390001" (empty string on failure)
  error?: string
  meta?: {
    pincode: string
    district: string
    state: string
    zone: string
    headPO: string
  }
}`,
    example: {
      input: 'validatePincode("390001")',
      output: '{ valid: true, formatted: "390001", meta: { pincode: "390001", district: "Vadodara", state: "Gujarat", zone: "Western", headPO: "Vadodara HO" } }',
    },
  },
  {
    name: "formatINR",
    signature: "formatINR(amount: number): string",
    desc: "Formats a number using the Indian numbering system (lakhs, crores) with the ₹ symbol.",
    params: [
      { name: "amount", type: "number", desc: "Numeric value to format." },
    ],
    returns: `string  // e.g. "₹12,34,567"`,
    example: {
      input: "formatINR(1234567)",
      output: '"₹12,34,567"',
    },
  },
  {
    name: "formatINRCompact",
    signature: "formatINRCompact(amount: number): string",
    desc: "Compact Indian number formatting with L (lakh) and Cr (crore) suffixes. Falls back to formatINR for values under ₹1L.",
    params: [
      { name: "amount", type: "number", desc: "Numeric value to format." },
    ],
    returns: `string  // e.g. "₹12.35L" or "₹1.23Cr"`,
    example: {
      input: "formatINRCompact(1234567)",
      output: '"₹12.35L"',
    },
  },
];

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = React.useState(false);
  return (
    <div style={{ position: "relative" }}>
      <pre
        style={{
          background: "#111",
          border: "0.5px solid #1C1C1C",
          borderRadius: 8,
          padding: "14px 16px",
          fontFamily: "var(--font-mono)",
          fontSize: 13,
          lineHeight: 1.8,
          color: "#FAFAF9",
          overflowX: "auto",
          margin: 0,
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
        }}
      >
        {code}
      </pre>
      <button
        onClick={() => {
          navigator.clipboard.writeText(code);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        }}
        style={{
          position: "absolute",
          top: 8,
          right: 8,
          fontSize: 11,
          padding: "3px 8px",
          borderRadius: 4,
          background: "#1C1C1C",
          color: copied ? "#86EFAC" : "#78716C",
          border: "none",
          cursor: "pointer",
          fontFamily: "var(--font-sans)",
          transition: "color 0.2s",
        }}
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
}

export default function DocsPage() {
  return (
    <div style={{ fontFamily: "var(--font-sans)", background: "#0A0A0A", minHeight: "100vh" }}>
      <Nav />
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "64px 32px 120px" }}>

        {/* Header */}
        <div style={{ marginBottom: 64 }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#F59E0B", marginBottom: 12 }}>
            Documentation
          </div>
          <h1 style={{ fontSize: 40, fontWeight: 800, color: "#FAFAF9", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 16 }}>
            Get up and running
          </h1>
          <p style={{ fontSize: 15, color: "#78716C", lineHeight: 1.75, maxWidth: 560 }}>
            Two npm packages. Zero runtime dependencies. Everything you need to build Indian-context products — validators, formatters, and React components.
          </p>
        </div>

        {/* Packages */}
        <div style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#FAFAF9", marginBottom: 20, letterSpacing: "-0.01em" }}>
            Packages
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {PACKAGES.map((pkg) => (
              <div key={pkg.name} style={{ background: "#111", border: "0.5px solid #1C1C1C", borderRadius: 10, padding: 20 }}>
                <code style={{ fontSize: 12, color: "#F59E0B", fontFamily: "var(--font-mono)", display: "block", marginBottom: 8 }}>
                  {pkg.name}
                </code>
                <p style={{ fontSize: 13, color: "#525252", lineHeight: 1.6, marginBottom: 16 }}>{pkg.desc}</p>
                <CodeBlock code={pkg.install} />
                <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {pkg.exports.map((e) => (
                    <code key={e} style={{ fontSize: 10, padding: "2px 6px", borderRadius: 4, background: "#1C1C1C", color: "#78716C", fontFamily: "var(--font-mono)" }}>
                      {e}
                    </code>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick example */}
        <div style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#FAFAF9", marginBottom: 8, letterSpacing: "-0.01em" }}>
            Quick example
          </h2>
          <p style={{ fontSize: 14, color: "#525252", lineHeight: 1.7, marginBottom: 20 }}>
            Import any validator and call it directly. Every function returns a consistent shape.
          </p>
          <CodeBlock code={`import { validatePAN, validateIFSC, formatINR } from "@bharat-ui/validators";

// Validate a PAN
validatePAN("ABCPE1234F");
// { valid: true, formatted: "ABCPE1234F", meta: { type: "Individual", typeCode: "P" } }

// Validate an IFSC and get bank metadata
validateIFSC("SBIN0001234");
// { valid: true, formatted: "SBIN0001234", bank: "State Bank of India", ... }

// Format a number in Indian style
formatINR(1234567);         // "₹12,34,567"
formatINRCompact(1234567);  // "₹12.35L"`} />
        </div>

        {/* Divider */}
        <div style={{ borderTop: "0.5px solid #1C1C1C", marginBottom: 64 }} />

        {/* API Reference */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#F59E0B", marginBottom: 8 }}>
            @bharat-ui/validators
          </div>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#FAFAF9", marginBottom: 40, letterSpacing: "-0.01em" }}>
            API Reference
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 56 }}>
            {API.map((fn) => (
              <div key={fn.name} id={fn.name}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <code style={{ fontSize: 16, fontWeight: 700, color: "#FAFAF9", fontFamily: "var(--font-mono)" }}>
                    {fn.name}
                  </code>
                  <div style={{ height: 1, flex: 1, background: "#1C1C1C" }} />
                </div>

                <p style={{ fontSize: 14, color: "#78716C", lineHeight: 1.7, marginBottom: 20 }}>{fn.desc}</p>

                <CodeBlock code={fn.signature} />

                <div style={{ marginTop: 20, marginBottom: 20 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#525252", marginBottom: 10 }}>
                    Parameters
                  </div>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ borderBottom: "0.5px solid #1C1C1C" }}>
                        {["Name", "Type", "Description"].map((h) => (
                          <th key={h} style={{ textAlign: "left", padding: "6px 12px", fontSize: 11, color: "#525252", fontWeight: 600, fontFamily: "var(--font-sans)" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {fn.params.map((p) => (
                        <tr key={p.name} style={{ borderBottom: "0.5px solid #1C1C1C" }}>
                          <td style={{ padding: "10px 12px" }}><code style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "#F59E0B" }}>{p.name}</code></td>
                          <td style={{ padding: "10px 12px" }}><code style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "#93C5FD" }}>{p.type}</code></td>
                          <td style={{ padding: "10px 12px", fontSize: 13, color: "#78716C", lineHeight: 1.5 }}>{p.desc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#525252", marginBottom: 10 }}>
                    Returns
                  </div>
                  <CodeBlock code={fn.returns} />
                </div>

                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#525252", marginBottom: 10 }}>
                    Example
                  </div>
                  <CodeBlock code={`${fn.example.input}\n// ${fn.example.output}`} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
