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
