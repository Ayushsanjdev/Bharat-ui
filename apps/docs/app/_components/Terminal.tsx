"use client";

import * as React from "react";
import {
  validatePAN,
  validateAadhaar,
  validateIFSC,
  validatePincode,
  formatINR,
  formatINRCompact,
} from "@bharat-ui/validators";

const VALIDATORS = [
  { id: "pan", label: "validatePAN()", placeholder: "ABCPE1234F" },
  { id: "aadhaar", label: "validateAadhaar()", placeholder: "2341 2341 2346" },
  { id: "ifsc", label: "validateIFSC()", placeholder: "SBIN0001234" },
  { id: "pincode", label: "validatePincode()", placeholder: "390001" },
  { id: "format", label: "formatINR()", placeholder: "1234567" },
];

function runValidator(id: string, value: string) {
  try {
    switch (id) {
      case "pan":
        return validatePAN(value);
      case "aadhaar":
        return validateAadhaar(value);
      case "ifsc":
        return validateIFSC(value);
      case "pincode":
        return validatePincode(value);
      case "format":
        return {
          valid: true,
          formatted: formatINR(Number(value)),
          compact: formatINRCompact(Number(value)),
        };
      default:
        return null;
    }
  } catch {
    return null;
  }
}

function JsonLine({ k, v }: { k: string; v: unknown }) {
  const color =
    typeof v === "boolean"
      ? "#F59E0B"
      : typeof v === "object" && v !== null
        ? "#93C5FD"
        : "#86EFAC";
  const display =
    typeof v === "object" && v !== null
      ? JSON.stringify(v, null, 2)
      : JSON.stringify(v);
  return (
    <div style={{ display: "flex", gap: 8 }}>
      <span style={{ color: "#78716C" }}>"{k}":</span>
      <span style={{ color }}>{display}</span>
    </div>
  );
}

export function Terminal() {
  const [activeId, setActiveId] = React.useState("pan");
  const [value, setValue] = React.useState("ABCPE1234F");
  const result = value ? runValidator(activeId, value) : null;

  const handleTabChange = (id: string, placeholder: string) => {
    setActiveId(id);
    setValue(placeholder);
  };

  return (
    <div
      style={{
        background: "#111",
        border: "0.5px solid #1C1C1C",
        borderRadius: 16,
        overflow: "hidden",
        fontFamily: "var(--font-mono)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "12px 16px",
          borderBottom: "0.5px solid #1C1C1C",
        }}
      >
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF5F57" }} />
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FEBC2E" }} />
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28C840" }} />
        <span style={{ fontSize: 12, color: "#525252", marginLeft: "auto", marginRight: "auto" }}>
          validator playground
        </span>
      </div>

      <div style={{ display: "flex", borderBottom: "0.5px solid #1C1C1C", overflowX: "auto" }}>
        {VALIDATORS.map((v) => (
          <button
            key={v.id}
            onClick={() => handleTabChange(v.id, v.placeholder)}
            style={{
              padding: "8px 14px",
              fontSize: 11,
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
        <div style={{ fontSize: 11, color: "#4C4C4C", marginBottom: 8 }}>// input</div>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value.toUpperCase())}
          placeholder={VALIDATORS.find((v) => v.id === activeId)?.placeholder}
          style={{
            width: "100%",
            background: "#0A0A0A",
            border: "0.5px solid #1C1C1C",
            borderRadius: 6,
            padding: "8px 12px",
            color: "#FAFAF9",
            fontFamily: "var(--font-mono)",
            fontSize: 13,
            outline: "none",
            marginBottom: 16,
            letterSpacing: "0.06em",
          }}
          onFocus={(e) => { e.target.style.borderColor = "#F59E0B"; }}
          onBlur={(e) => { e.target.style.borderColor = "#1C1C1C"; }}
        />

        <div style={{ fontSize: 11, color: "#4C4C4C", marginBottom: 8 }}>// output</div>
        <div
          style={{
            background: "#0A0A0A",
            borderRadius: 8,
            padding: 16,
            fontSize: 12,
            lineHeight: 1.9,
            minHeight: 120,
          }}
        >
          {result ? (
            Object.entries(result).map(([k, v]) =>
              v !== undefined && v !== "" ? <JsonLine key={k} k={k} v={v} /> : null,
            )
          ) : (
            <span style={{ color: "#4C4C4C" }}>// type a value above...</span>
          )}
        </div>
      </div>
    </div>
  );
}
