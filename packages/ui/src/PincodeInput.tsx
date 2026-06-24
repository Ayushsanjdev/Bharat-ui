"use client";

import { validatePincode } from "@bharat-ui/validators";
import * as React from "react";

export interface PincodeInputProps {
  value?: string;
  onChange?: (value: string, valid: boolean) => void;
  label?: string;
  error?: string;
  disabled?: boolean;
  showCascade?: boolean;
}

export function PincodeInput({
  value = "",
  onChange,
  label,
  error,
  disabled = false,
  showCascade = true,
}: PincodeInputProps) {
  const [focused, setFocused] = React.useState(false);

  const result = value.length === 6 ? validatePincode(value) : null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = e.target.value.replace(/\D/g, "").slice(0, 6);
    onChange?.(
      cleaned,
      cleaned.length === 6 ? validatePincode(cleaned).valid : false,
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      {label && (
        <label
          style={{
            fontSize: "13px",
            fontWeight: 500,
            color: error ? "#dc2626" : "#6b7280",
          }}
        >
          {label}
        </label>
      )}

      <input
        type="text"
        inputMode="numeric"
        value={value}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        disabled={disabled}
        maxLength={6}
        placeholder="390001"
        style={{
          border: `1.5px solid ${
            error ? "#dc2626" : focused ? "#B45309" : "#d1d5db"
          }`,
          borderRadius: "8px",
          padding: "10px 12px",
          fontSize: "15px",
          fontFamily: "var(--font-mono, monospace)",
          letterSpacing: "0.08em",
          outline: "none",
          background: disabled ? "#f9fafb" : "#ffffff",
          color: "#111827",
          width: "100%",
          boxSizing: "border-box",
          boxShadow: focused ? "0 0 0 3px rgba(180,83,9,0.12)" : "none",
          transition: "all 0.15s ease",
        }}
      />

      {showCascade && result?.valid && result.meta && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            padding: "10px 12px",
            background: "#f9fafb",
            borderRadius: "8px",
            border: "0.5px solid #e5e7eb",
            marginTop: "2px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "13px",
            }}
          >
            <span style={{ color: "#6b7280" }}>District</span>
            <span style={{ fontWeight: 500, color: "#111827" }}>
              {result.meta.district}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "13px",
            }}
          >
            <span style={{ color: "#6b7280" }}>State</span>
            <span style={{ fontWeight: 500, color: "#111827" }}>
              {result.meta.state}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "13px",
            }}
          >
            <span style={{ color: "#6b7280" }}>Zone</span>
            <span style={{ fontWeight: 500, color: "#111827" }}>
              {result.meta.zone}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "13px",
            }}
          >
            <span style={{ color: "#6b7280" }}>Head PO</span>
            <span style={{ fontWeight: 500, color: "#111827" }}>
              {result.meta.headPO}
            </span>
          </div>
        </div>
      )}

      {showCascade && result && !result.valid && value.length === 6 && (
        <span style={{ fontSize: "12px", color: "#dc2626" }}>
          {result.error}
        </span>
      )}

      {error && (
        <span style={{ fontSize: "12px", color: "#dc2626" }}>{error}</span>
      )}
    </div>
  );
}
