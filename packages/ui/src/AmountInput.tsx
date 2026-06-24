"use client";

import { formatINR, formatINRCompact, parseINR } from "@bharat-ui/validators";
import * as React from "react";

export interface AmountInputProps {
  value?: number;
  onChange?: (raw: number, formatted: string) => void;
  placeholder?: string;
  disabled?: boolean;
  label?: string;
  error?: string;
  showCompact?: boolean;
}

export function AmountInput({
  value,
  onChange,
  placeholder = "0",
  disabled = false,
  label,
  error,
  showCompact = true,
}: AmountInputProps) {
  const [display, setDisplay] = React.useState(value ? formatINR(value) : "");
  const [focused, setFocused] = React.useState(false);

  const handleFocus = () => {
    setFocused(true);
    if (display) {
      setDisplay(String(parseINR(display)));
    }
  };

  const handleBlur = () => {
    setFocused(false);
    const raw = parseINR(display);
    if (!isNaN(raw) && raw > 0) {
      setDisplay(formatINR(raw));
      onChange?.(raw, formatINR(raw));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^\d]/g, "");
    setDisplay(val);
  };

  const raw = parseINR(display);
  const compact = !isNaN(raw) && raw > 0 ? formatINRCompact(raw) : null;

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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          border: `1.5px solid ${error ? "#dc2626" : focused ? "#B45309" : "#d1d5db"}`,
          borderRadius: "8px",
          padding: "0 12px",
          gap: "6px",
          background: disabled ? "#f9fafb" : "#ffffff",
          boxShadow: focused ? "0 0 0 3px rgba(180,83,9,0.12)" : "none",
          transition: "all 0.15s ease",
        }}
      >
        <span
          style={{
            fontSize: "16px",
            fontWeight: 500,
            color: "#6b7280",
            userSelect: "none",
          }}
        >
          ₹
        </span>
        <input
          type="text"
          inputMode="numeric"
          value={display}
          placeholder={placeholder}
          disabled={disabled}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={{
            border: "none",
            outline: "none",
            fontSize: "16px",
            fontWeight: 500,
            padding: "10px 0",
            width: "100%",
            background: "transparent",
            color: "#111827",
          }}
        />
      </div>
      {showCompact && compact && !focused && (
        <span
          style={{
            fontSize: "12px",
            color: "#6b7280",
          }}
        >
          {compact}
        </span>
      )}
      {error && (
        <span
          style={{
            fontSize: "12px",
            color: "#dc2626",
          }}
        >
          {error}
        </span>
      )}
    </div>
  );
}
