# Bharat UI — Full Docs Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace three "coming soon" stub pages with fully functional content — `/docs` (getting started + API reference), `/components` (live demos + prop variants + prop tables), `/playground` (dual-tab validator/component playground).

**Architecture:** Each page lives at `apps/docs/app/<route>/page.tsx`. All three are `"use client"` components (copy buttons, live demos, interactive state). All import the shared `Nav` from `app/_components/Nav.tsx` and use inline styles. The existing `export const metadata` lines in stubs must be removed since `"use client"` pages cannot export `metadata`.

**Tech Stack:** Next.js App Router, React 18, TypeScript, `@bharat-ui/validators`, `@bharat-ui/react`, inline styles, bun

## Global Constraints
- Inline styles only — no CSS modules, Tailwind, styled-components
- Colors: `#0A0A0A` bg · `#111` surface · `#1C1C1C` border · `#F59E0B` amber · `#FAFAF9` light text · `#78716C` muted · `#525252` dim · `#86EFAC` green · `#93C5FD` blue · `#F87171` red
- Border throughout: `0.5px solid #1C1C1C`
- Font: `var(--font-sans)` on root wrapper, `var(--font-mono)` on all code/pre elements
- Nav: `import { Nav } from "../_components/Nav"` (no props)
- No new npm dependencies
- All pages: `background: "#0A0A0A"`, `minHeight: "100vh"`, `fontFamily: "var(--font-sans)"`
- Remove `export const metadata` from all three pages (incompatible with `"use client"`)

## Accurate component prop signatures (from source)
- `AmountInput.onChange?: (raw: number, formatted: string) => void`
- `PANInput.onChange?: (value: string, valid: boolean) => void`
- `PincodeInput.onChange?: (value: string, valid: boolean) => void`
- `OTPInput.length?: 4 | 6` (union type, not arbitrary number)
- `OTPInput.onChange?: (otp: string) => void` (fires on each digit)
- `UPIButton`: `vpa: string, amount: number, merchantName: string, transactionNote?: string`

---

### Task 1: `/docs` page — Getting started + API reference

**Files:**
- Modify: `apps/docs/app/docs/page.tsx` (replace stub entirely)

**Interfaces:**
- Produces: `/docs` route — static-ish page with copy buttons

- [ ] **Step 1: Write `apps/docs/app/docs/page.tsx`**

```tsx
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
  formatted?: string        // "2341 2341 2346"
  masked?: string           // "XXXX XXXX 2346"
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
  formatted?: string        // "SBIN0001234"
  bank?: string
  branch?: string
  city?: string
  state?: string
  error?: string
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
  district?: string
  state?: string
  zone?: string
  headOffice?: string
  error?: string
}`,
    example: {
      input: 'validatePincode("390001")',
      output: '{ valid: true, district: "Vadodara", state: "Gujarat", zone: "Western", headOffice: "Vadodara HO" }',
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
```

- [ ] **Step 2: Verify at `http://localhost:3001/docs`**

Open the page. Confirm:
- Header, two package cards, quick example code block all render
- All 6 API function sections render with param table, returns block, example
- Copy button on any code block turns green on click

- [ ] **Step 3: Commit**

```bash
git add apps/docs/app/docs/page.tsx
git commit -m "feat(docs): build /docs page with getting started and full API reference"
```

---

### Task 2: `/components` page — Live demos + prop variants + prop tables

**Files:**
- Modify: `apps/docs/app/components/page.tsx` (replace stub entirely)

**Interfaces:**
- Consumes: `AmountInput` from `"@bharat-ui/react/AmountInput"` — `onChange: (raw: number, formatted: string) => void`
- Consumes: `OTPInput` from `"@bharat-ui/react/OTPInput"` — `length: 4 | 6`, `onChange: (otp: string) => void`, `onComplete: (otp: string) => void`
- Consumes: `PANInput` from `"@bharat-ui/react/PANInput"` — `onChange: (value: string, valid: boolean) => void`
- Consumes: `PincodeInput` from `"@bharat-ui/react/PincodeInput"` — `onChange: (value: string, valid: boolean) => void`
- Consumes: `UPIButton` from `"@bharat-ui/react/UPIButton"` — `vpa, amount, merchantName, transactionNote?`

- [ ] **Step 1: Write `apps/docs/app/components/page.tsx`**

```tsx
"use client";

import * as React from "react";
import { Nav } from "../_components/Nav";
import { AmountInput } from "@bharat-ui/react/AmountInput";
import { OTPInput } from "@bharat-ui/react/OTPInput";
import { PANInput } from "@bharat-ui/react/PANInput";
import { PincodeInput } from "@bharat-ui/react/PincodeInput";
import { UPIButton } from "@bharat-ui/react/UPIButton";

type PropRow = { name: string; type: string; default: string; desc: string };

const PROP_TABLES: Record<string, PropRow[]> = {
  AmountInput: [
    { name: "value", type: "number | undefined", default: "undefined", desc: "Controlled raw numeric value." },
    { name: "onChange", type: "(raw: number, formatted: string) => void", default: "—", desc: "Called with raw number and formatted string on change." },
    { name: "label", type: "string", default: "—", desc: "Label shown above the input." },
    { name: "placeholder", type: "string", default: '"0"', desc: "Placeholder text." },
    { name: "error", type: "string", default: "—", desc: "Error message shown below the input." },
    { name: "disabled", type: "boolean", default: "false", desc: "Disables the input." },
    { name: "showCompact", type: "boolean", default: "true", desc: "Shows compact (lakh/crore) format below the input." },
  ],
  OTPInput: [
    { name: "length", type: "4 | 6", default: "6", desc: "Number of OTP digits." },
    { name: "label", type: "string", default: "—", desc: "Label shown above the boxes." },
    { name: "onComplete", type: "(otp: string) => void", default: "—", desc: "Called when all digits are filled." },
    { name: "onChange", type: "(otp: string) => void", default: "—", desc: "Called on every digit change." },
    { name: "resendAfterSeconds", type: "number", default: "30", desc: "Seconds before the Resend button activates." },
    { name: "onResend", type: "() => void", default: "—", desc: "Called when the user clicks Resend." },
    { name: "error", type: "string", default: "—", desc: "Error message shown below the boxes." },
    { name: "disabled", type: "boolean", default: "false", desc: "Disables all boxes." },
  ],
  PANInput: [
    { name: "value", type: "string", default: '""', desc: "Controlled value." },
    { name: "onChange", type: "(value: string, valid: boolean) => void", default: "—", desc: "Called with the cleaned value and validity on every keystroke." },
    { name: "label", type: "string", default: "—", desc: "Label shown above the input." },
    { name: "error", type: "string", default: "—", desc: "Error message shown below the input." },
    { name: "disabled", type: "boolean", default: "false", desc: "Disables the input." },
    { name: "showTypeBadge", type: "boolean", default: "true", desc: "Shows taxpayer type badge (Individual, Company, etc.) on valid PAN." },
  ],
  PincodeInput: [
    { name: "value", type: "string", default: '""', desc: "Controlled value." },
    { name: "onChange", type: "(value: string, valid: boolean) => void", default: "—", desc: "Called with the cleaned value and validity on every keystroke." },
    { name: "label", type: "string", default: "—", desc: "Label shown above the input." },
    { name: "error", type: "string", default: "—", desc: "Error message shown below the input." },
    { name: "disabled", type: "boolean", default: "false", desc: "Disables the input." },
    { name: "showCascade", type: "boolean", default: "true", desc: "Shows resolved district and state below the input on valid pincode." },
  ],
  UPIButton: [
    { name: "vpa", type: "string", default: "—", desc: "Merchant Virtual Payment Address, e.g. merchant@okaxis." },
    { name: "amount", type: "number", default: "—", desc: "Payment amount in rupees." },
    { name: "merchantName", type: "string", default: "—", desc: "Displayed merchant name." },
    { name: "transactionNote", type: "string", default: "—", desc: "Optional note attached to the transaction." },
    { name: "currency", type: "string", default: '"INR"', desc: "ISO 4217 currency code." },
    { name: "onSuccess", type: "() => void", default: "—", desc: "Called when payment initiates successfully." },
    { name: "onError", type: "(error: string) => void", default: "—", desc: "Called on payment error." },
  ],
};

function PropTable({ rows }: { rows: PropRow[] }) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 20 }}>
      <thead>
        <tr style={{ borderBottom: "0.5px solid #1C1C1C" }}>
          {["Prop", "Type", "Default", "Description"].map((h) => (
            <th key={h} style={{ textAlign: "left", padding: "6px 12px", fontSize: 11, color: "#525252", fontWeight: 600, fontFamily: "var(--font-sans)" }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((p) => (
          <tr key={p.name} style={{ borderBottom: "0.5px solid #1C1C1C" }}>
            <td style={{ padding: "10px 12px" }}><code style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "#F59E0B" }}>{p.name}</code></td>
            <td style={{ padding: "10px 12px" }}><code style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#93C5FD", whiteSpace: "nowrap" }}>{p.type}</code></td>
            <td style={{ padding: "10px 12px" }}><code style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#525252" }}>{p.default}</code></td>
            <td style={{ padding: "10px 12px", fontSize: 13, color: "#78716C", lineHeight: 1.5 }}>{p.desc}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function SectionHeader({ name }: { name: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
      <code style={{ fontSize: 16, fontWeight: 700, color: "#FAFAF9", fontFamily: "var(--font-mono)" }}>{name}</code>
      <div style={{ height: 1, flex: 1, background: "#1C1C1C" }} />
    </div>
  );
}

function DemoCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ background: "#111", border: "0.5px solid #1C1C1C", borderRadius: 10, padding: 20 }}>
      <div style={{ fontSize: 11, color: "#525252", fontFamily: "var(--font-mono)", marginBottom: 14 }}>{label}</div>
      {children}
    </div>
  );
}

export default function ComponentsPage() {
  const [pan, setPan] = React.useState("");
  const [pan2, setPan2] = React.useState("ABCPE1234F");
  const [pincode, setPincode] = React.useState("");
  const [amount, setAmount] = React.useState<number | undefined>();

  return (
    <div style={{ fontFamily: "var(--font-sans)", background: "#0A0A0A", minHeight: "100vh" }}>
      <Nav />
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "64px 32px 120px" }}>

        {/* Header */}
        <div style={{ marginBottom: 64 }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#F59E0B", marginBottom: 12 }}>
            @bharat-ui/react
          </div>
          <h1 style={{ fontSize: 40, fontWeight: 800, color: "#FAFAF9", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 16 }}>
            Components
          </h1>
          <p style={{ fontSize: 15, color: "#78716C", lineHeight: 1.75 }}>
            React components that wire up the validators, handle formatting, and manage input state.
            Each demo below is fully interactive — try it.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 80 }}>

          {/* AmountInput */}
          <section id="AmountInput">
            <SectionHeader name="AmountInput" />
            <p style={{ fontSize: 14, color: "#78716C", lineHeight: 1.7, marginBottom: 24 }}>
              Currency input with live INR formatting. Displays ₹ formatted output while storing the raw number internally. Shows compact notation (lakh/crore) below the field.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <DemoCard label="// default">
                <AmountInput label="Loan amount" placeholder="Enter amount" value={amount} onChange={(raw) => setAmount(raw)} />
              </DemoCard>
              <DemoCard label="// pre-filled">
                <AmountInput label="Invoice total" placeholder="0" value={1234567} onChange={() => {}} />
              </DemoCard>
            </div>
            <PropTable rows={PROP_TABLES.AmountInput} />
          </section>

          {/* OTPInput */}
          <section id="OTPInput">
            <SectionHeader name="OTPInput" />
            <p style={{ fontSize: 14, color: "#78716C", lineHeight: 1.7, marginBottom: 24 }}>
              Individual-box OTP entry with auto-advance, backspace handling, paste support, and a built-in resend countdown timer.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <DemoCard label="// length={6} (default)">
                <OTPInput label="Enter OTP sent to +91 98765 43210" length={6} resendAfterSeconds={30} onComplete={() => {}} onResend={() => {}} />
              </DemoCard>
              <DemoCard label="// length={4}">
                <OTPInput label="Enter 4-digit PIN" length={4} resendAfterSeconds={60} onComplete={() => {}} onResend={() => {}} />
              </DemoCard>
            </div>
            <PropTable rows={PROP_TABLES.OTPInput} />
          </section>

          {/* PANInput */}
          <section id="PANInput">
            <SectionHeader name="PANInput" />
            <p style={{ fontSize: 14, color: "#78716C", lineHeight: 1.7, marginBottom: 24 }}>
              Text input that auto-uppercases, validates PAN format on each keystroke, and shows the taxpayer type badge (Individual, Company, HUF, etc.) on valid input.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <DemoCard label="// empty — type a PAN">
                <PANInput label="PAN number" value={pan} onChange={(v) => setPan(v)} />
              </DemoCard>
              <DemoCard label="// pre-filled valid PAN">
                <PANInput label="PAN number" value={pan2} onChange={(v) => setPan2(v)} />
              </DemoCard>
            </div>
            <PropTable rows={PROP_TABLES.PANInput} />
          </section>

          {/* PincodeInput */}
          <section id="PincodeInput">
            <SectionHeader name="PincodeInput" />
            <p style={{ fontSize: 14, color: "#78716C", lineHeight: 1.7, marginBottom: 24 }}>
              Numeric input that looks up the 6-digit pincode in the India Post dataset and shows the resolved district and state below the field on valid input — no network calls.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <DemoCard label="// empty — type a pincode">
                <PincodeInput label="Pincode" value={pincode} onChange={(v) => setPincode(v)} />
              </DemoCard>
              <DemoCard label="// pre-filled: 390001 (Vadodara)">
                <PincodeInput label="Pincode" value="390001" onChange={() => {}} />
              </DemoCard>
            </div>
            <PropTable rows={PROP_TABLES.PincodeInput} />
          </section>

          {/* UPIButton */}
          <section id="UPIButton">
            <SectionHeader name="UPIButton" />
            <p style={{ fontSize: 14, color: "#78716C", lineHeight: 1.7, marginBottom: 24 }}>
              Renders a row of UPI app buttons (GPay, PhonePe, Paytm, BHIM) that each generate a deep-link payment URI. No SDK or backend required.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <DemoCard label="// fixed amount">
                <UPIButton vpa="merchant@okaxis" amount={499} merchantName="Bharat UI" transactionNote="Pro plan" />
              </DemoCard>
              <DemoCard label="// amount from AmountInput above">
                <UPIButton vpa="merchant@okaxis" amount={amount ?? 100} merchantName="Bharat UI" transactionNote="Custom amount" />
              </DemoCard>
            </div>
            <PropTable rows={PROP_TABLES.UPIButton} />
          </section>

        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify at `http://localhost:3001/components`**

Open the page. Confirm:
- All 5 component sections render with side-by-side demo cards and prop tables
- PANInput: typing `ABCPE1234F` shows "Individual" badge
- PincodeInput: typing `390001` shows district/state
- AmountInput: typing `1234567` shows `₹12,34,567`
- UPIButton: both cards render app buttons

- [ ] **Step 3: Commit**

```bash
git add apps/docs/app/components/page.tsx
git commit -m "feat(docs): build /components page with live demos, variants, and prop tables"
```

---

### Task 3: `/playground` page — Dual-tab validator + component playground

**Files:**
- Modify: `apps/docs/app/playground/page.tsx` (replace stub entirely)

**Interfaces:**
- Consumes: all 6 validator functions from `"@bharat-ui/validators"`
- Consumes: all 5 components from `"@bharat-ui/react/*"` (same import paths as Task 2)
- Produces: interactive page at `/playground` route

- [ ] **Step 1: Write `apps/docs/app/playground/page.tsx`**

```tsx
"use client";

import * as React from "react";
import { Nav } from "../_components/Nav";
import {
  validatePAN,
  validateAadhaar,
  validateIFSC,
  validatePincode,
  formatINR,
  formatINRCompact,
} from "@bharat-ui/validators";
import { AmountInput } from "@bharat-ui/react/AmountInput";
import { OTPInput } from "@bharat-ui/react/OTPInput";
import { PANInput } from "@bharat-ui/react/PANInput";
import { PincodeInput } from "@bharat-ui/react/PincodeInput";
import { UPIButton } from "@bharat-ui/react/UPIButton";

// ── Validators tab ──────────────────────────────────────────────

const VALIDATORS = [
  { id: "pan",          label: "validatePAN()",         placeholder: "ABCPE1234F",    hint: "10-char PAN",         uppercase: true  },
  { id: "aadhaar",      label: "validateAadhaar()",     placeholder: "234123412346",   hint: "12-digit Aadhaar",    uppercase: false },
  { id: "ifsc",         label: "validateIFSC()",        placeholder: "SBIN0001234",   hint: "11-char IFSC",        uppercase: true  },
  { id: "pincode",      label: "validatePincode()",     placeholder: "390001",        hint: "6-digit pincode",     uppercase: false },
  { id: "formatINR",    label: "formatINR()",           placeholder: "1234567",       hint: "any number",          uppercase: false },
  { id: "formatCompact",label: "formatINRCompact()",   placeholder: "1234567",       hint: "any number",          uppercase: false },
] as const;

type ValidatorId = typeof VALIDATORS[number]["id"];

function runValidator(id: ValidatorId, value: string): Record<string, unknown> | null {
  try {
    switch (id) {
      case "pan":     return validatePAN(value) as Record<string, unknown>;
      case "aadhaar": return validateAadhaar(value) as Record<string, unknown>;
      case "ifsc":    return validateIFSC(value) as Record<string, unknown>;
      case "pincode": return validatePincode(value) as Record<string, unknown>;
      case "formatINR": {
        const n = Number(value);
        if (isNaN(n)) return { valid: false, error: "Not a valid number" };
        return { valid: true, formatted: formatINR(n), compact: formatINRCompact(n) };
      }
      case "formatCompact": {
        const n = Number(value);
        if (isNaN(n)) return { valid: false, error: "Not a valid number" };
        return { valid: true, formatted: formatINRCompact(n) };
      }
    }
  } catch {
    return null;
  }
}

function ResultLine({ k, v }: { k: string; v: unknown }) {
  const color =
    typeof v === "boolean"
      ? v ? "#86EFAC" : "#F87171"
      : typeof v === "object" && v !== null
        ? "#93C5FD"
        : "#FAFAF9";
  const display = typeof v === "object" && v !== null ? JSON.stringify(v) : JSON.stringify(v);
  return (
    <div style={{ display: "flex", gap: 8, fontSize: 13, lineHeight: 1.9, fontFamily: "var(--font-mono)" }}>
      <span style={{ color: "#525252" }}>"{k}":</span>
      <span style={{ color }}>{display}</span>
    </div>
  );
}

function ValidatorsTab() {
  const [activeId, setActiveId] = React.useState<ValidatorId>("pan");
  const [value, setValue] = React.useState("ABCPE1234F");
  const result = value ? runValidator(activeId, value) : null;
  const active = VALIDATORS.find((v) => v.id === activeId)!;

  const handleTabChange = (v: typeof VALIDATORS[number]) => {
    setActiveId(v.id);
    setValue(v.placeholder);
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "start" }}>
      {/* Input panel */}
      <div style={{ background: "#111", border: "0.5px solid #1C1C1C", borderRadius: 12, overflow: "hidden" }}>
        <div style={{ display: "flex", overflowX: "auto", borderBottom: "0.5px solid #1C1C1C" }}>
          {VALIDATORS.map((v) => (
            <button
              key={v.id}
              onClick={() => handleTabChange(v)}
              style={{
                padding: "8px 10px",
                fontSize: 10,
                fontFamily: "var(--font-mono)",
                border: "none",
                borderBottom: activeId === v.id ? "1.5px solid #F59E0B" : "1.5px solid transparent",
                background: "transparent",
                color: activeId === v.id ? "#F59E0B" : "#525252",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "color 0.15s",
              }}
            >
              {v.label}
            </button>
          ))}
        </div>
        <div style={{ padding: 20 }}>
          <div style={{ fontSize: 11, color: "#525252", marginBottom: 6, fontFamily: "var(--font-mono)" }}>
            // input ({active.hint})
          </div>
          <input
            value={value}
            onChange={(e) => setValue(active.uppercase ? e.target.value.toUpperCase() : e.target.value)}
            placeholder={active.placeholder}
            style={{
              width: "100%",
              background: "#0A0A0A",
              border: "0.5px solid #1C1C1C",
              borderRadius: 6,
              padding: "8px 12px",
              color: "#FAFAF9",
              fontFamily: "var(--font-mono)",
              fontSize: 14,
              outline: "none",
              letterSpacing: "0.06em",
              boxSizing: "border-box",
            }}
            onFocus={(e) => { e.target.style.borderColor = "#F59E0B"; }}
            onBlur={(e) => { e.target.style.borderColor = "#1C1C1C"; }}
          />
        </div>
      </div>

      {/* Output panel */}
      <div style={{ background: "#111", border: "0.5px solid #1C1C1C", borderRadius: 12, padding: 20, minHeight: 200 }}>
        <div style={{ fontSize: 11, color: "#525252", marginBottom: 12, fontFamily: "var(--font-mono)" }}>// output</div>
        {result ? (
          Object.entries(result).map(([k, v]) =>
            v !== undefined && v !== "" ? <ResultLine key={k} k={k} v={v} /> : null
          )
        ) : (
          <span style={{ color: "#4C4C4C", fontSize: 13, fontFamily: "var(--font-mono)" }}>// type a value above...</span>
        )}
      </div>
    </div>
  );
}

// ── Components tab ──────────────────────────────────────────────

const COMPONENT_OPTIONS = ["PANInput", "PincodeInput", "AmountInput", "OTPInput", "UPIButton"] as const;
type ComponentName = typeof COMPONENT_OPTIONS[number];

function ComponentsTab() {
  const [selected, setSelected] = React.useState<ComponentName>("PANInput");
  const [pan, setPan] = React.useState("");
  const [panValid, setPanValid] = React.useState(false);
  const [pincode, setPincode] = React.useState("");
  const [pincodeValid, setPincodeValid] = React.useState(false);
  const [amount, setAmount] = React.useState<number | undefined>();
  const [lastEvent, setLastEvent] = React.useState<string>("—");

  function renderComponent() {
    switch (selected) {
      case "PANInput":
        return (
          <PANInput
            label="PAN number"
            value={pan}
            onChange={(v, valid) => {
              setPan(v);
              setPanValid(valid);
              setLastEvent(`onChange("${v}", ${valid})`);
            }}
          />
        );
      case "PincodeInput":
        return (
          <PincodeInput
            label="Pincode"
            value={pincode}
            onChange={(v, valid) => {
              setPincode(v);
              setPincodeValid(valid);
              setLastEvent(`onChange("${v}", ${valid})`);
            }}
          />
        );
      case "AmountInput":
        return (
          <AmountInput
            label="Amount"
            placeholder="Enter amount"
            value={amount}
            onChange={(raw, formatted) => {
              setAmount(raw);
              setLastEvent(`onChange(${raw}, "${formatted}")`);
            }}
          />
        );
      case "OTPInput":
        return (
          <OTPInput
            label="Enter OTP"
            length={6}
            resendAfterSeconds={30}
            onChange={(otp) => setLastEvent(`onChange("${otp}")`)}
            onComplete={(otp) => setLastEvent(`onComplete("${otp}")`)}
            onResend={() => setLastEvent("onResend()")}
          />
        );
      case "UPIButton":
        return (
          <UPIButton
            vpa="merchant@okaxis"
            amount={amount ?? 499}
            merchantName="Bharat UI Demo"
            transactionNote="Test payment"
            onSuccess={() => setLastEvent("onSuccess()")}
            onError={(e) => setLastEvent(`onError("${e}")`)}
          />
        );
    }
  }

  const stateLines: { label: string; value: string; color: string }[] = [
    { label: "component", value: `"${selected}"`, color: "#F59E0B" },
    ...(selected === "PANInput" ? [
      { label: "value", value: `"${pan}"`, color: "#FAFAF9" },
      { label: "valid", value: String(panValid), color: panValid ? "#86EFAC" : "#F87171" },
    ] : []),
    ...(selected === "PincodeInput" ? [
      { label: "value", value: `"${pincode}"`, color: "#FAFAF9" },
      { label: "valid", value: String(pincodeValid), color: pincodeValid ? "#86EFAC" : "#F87171" },
    ] : []),
    ...(selected === "AmountInput" || selected === "UPIButton" ? [
      { label: "amount", value: amount !== undefined ? String(amount) : "undefined", color: "#93C5FD" },
    ] : []),
    { label: "last event", value: lastEvent, color: "#86EFAC" },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "start" }}>
      {/* Left: picker + component */}
      <div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
          {COMPONENT_OPTIONS.map((name) => (
            <button
              key={name}
              onClick={() => { setSelected(name); setLastEvent("—"); }}
              style={{
                padding: "5px 10px",
                fontSize: 11,
                fontFamily: "var(--font-mono)",
                border: "0.5px solid",
                borderColor: selected === name ? "#F59E0B" : "#1C1C1C",
                borderRadius: 6,
                background: selected === name ? "#F59E0B22" : "transparent",
                color: selected === name ? "#F59E0B" : "#525252",
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              {name}
            </button>
          ))}
        </div>
        <div style={{ background: "#111", border: "0.5px solid #1C1C1C", borderRadius: 12, padding: 24 }}>
          {renderComponent()}
        </div>
      </div>

      {/* Right: live state */}
      <div style={{ background: "#111", border: "0.5px solid #1C1C1C", borderRadius: 12, padding: 20 }}>
        <div style={{ fontSize: 11, color: "#525252", marginBottom: 16, fontFamily: "var(--font-mono)" }}>// live state</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {stateLines.map((line) => (
            <div key={line.label} style={{ fontFamily: "var(--font-mono)", fontSize: 13, lineHeight: 1.7 }}>
              <span style={{ color: "#525252" }}>{line.label}: </span>
              <span style={{ color: line.color }}>{line.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Page ────────────────────────────────────────────────────────

export default function PlaygroundPage() {
  const [tab, setTab] = React.useState<"validators" | "components">("validators");

  return (
    <div style={{ fontFamily: "var(--font-sans)", background: "#0A0A0A", minHeight: "100vh" }}>
      <Nav />
      <div style={{ maxWidth: 1040, margin: "0 auto", padding: "64px 32px 120px" }}>

        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#F59E0B", marginBottom: 12 }}>
            Playground
          </div>
          <h1 style={{ fontSize: 40, fontWeight: 800, color: "#FAFAF9", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 16 }}>
            Try it live
          </h1>
          <p style={{ fontSize: 15, color: "#78716C", lineHeight: 1.75 }}>
            Test validators with real inputs and interact with components in real time.
          </p>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, marginBottom: 36, borderBottom: "0.5px solid #1C1C1C" }}>
          {(["validators", "components"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                padding: "10px 20px",
                fontSize: 13,
                fontFamily: "var(--font-sans)",
                border: "none",
                borderBottom: tab === t ? "2px solid #F59E0B" : "2px solid transparent",
                background: "transparent",
                color: tab === t ? "#FAFAF9" : "#525252",
                cursor: "pointer",
                fontWeight: tab === t ? 600 : 400,
                transition: "all 0.15s",
                textTransform: "capitalize",
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === "validators" ? <ValidatorsTab /> : <ComponentsTab />}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify at `http://localhost:3001/playground`**

Open the page. Confirm:
- **Validators tab (default):** all 6 function tabs render; type `ABCPE1234F` in PAN tab → output shows `valid: true`, `meta`; switch to `formatINR` tab, type `1234567` → shows `formatted: "₹12,34,567"`
- **Components tab:** click "Components" tab; pick PANInput, type `ABCPE1234F` → live state panel shows `valid: true`; pick AmountInput, type amount → state updates; pick OTPInput, fill all boxes → `onComplete` event shown
- UPIButton shows payment buttons

- [ ] **Step 3: Run build check**

```bash
cd /Users/ayushsanj/Documents/bharat-ui && bun run build --filter=docs 2>&1 | tail -20
```

Expected: exits 0, no TypeScript errors.

- [ ] **Step 4: Commit**

```bash
git add apps/docs/app/playground/page.tsx
git commit -m "feat(docs): build /playground page with dual-tab validator and component playground"
```
