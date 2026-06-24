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
      case "pan":     return validatePAN(value) as unknown as Record<string, unknown>;
      case "aadhaar": return validateAadhaar(value) as unknown as Record<string, unknown>;
      case "ifsc":    return validateIFSC(value) as unknown as Record<string, unknown>;
      case "pincode": return validatePincode(value) as unknown as Record<string, unknown>;
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
