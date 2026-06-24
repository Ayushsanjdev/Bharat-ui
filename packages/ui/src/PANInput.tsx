"use client";

import { validatePAN } from "@bharat-ui/validators";
import * as React from "react";

export interface PANInputProps {
  value?: string;
  onChange?: (value: string, valid: boolean) => void;
  label?: string;
  error?: string;
  disabled?: boolean;
  showTypeBadge?: boolean;
}

const TYPE_COLORS: Record<string, { bg: string; text: string }> = {
  P: { bg: "#f0fdf4", text: "#15803d" },
  C: { bg: "#eff6ff", text: "#1d4ed8" },
  H: { bg: "#fef3c7", text: "#92400e" },
  F: { bg: "#fdf4ff", text: "#7e22ce" },
  T: { bg: "#fff1f2", text: "#be123c" },
};

export function PANInput({
  value = "",
  onChange,
  label,
  error,
  disabled = false,
  showTypeBadge = true,
}: PANInputProps) {
  const [focused, setFocused] = React.useState(false);

  const result = value.length > 0 ? validatePAN(value) : null;
  const typeCode = result?.meta?.typeCode ?? null;
  const badgeColor = typeCode
    ? (TYPE_COLORS[typeCode] ?? { bg: "#f3f4f6", text: "#374151" })
    : null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = e.target.value
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "")
      .slice(0, 10);
    onChange?.(cleaned, validatePAN(cleaned).valid);
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

      <div
        style={{
          display: "flex",
          alignItems: "center",
          border: `1.5px solid ${
            error ? "#dc2626" : focused ? "#B45309" : "#d1d5db"
          }`,
          borderRadius: "8px",
          padding: "0 12px",
          gap: "8px",
          background: disabled ? "#f9fafb" : "#ffffff",
          boxShadow: focused ? "0 0 0 3px rgba(180,83,9,0.12)" : "none",
          transition: "all 0.15s ease",
        }}
      >
        <input
          type="text"
          value={value}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          disabled={disabled}
          maxLength={10}
          placeholder="ABCDE1234F"
          style={{
            border: "none",
            outline: "none",
            fontSize: "15px",
            fontFamily: "var(--font-mono, monospace)",
            letterSpacing: "0.12em",
            padding: "10px 0",
            width: "100%",
            background: "transparent",
            color: "#111827",
            textTransform: "uppercase",
          }}
        />

        {showTypeBadge && result?.valid && badgeColor && (
          <span
            style={{
              fontSize: "11px",
              fontWeight: 500,
              padding: "2px 8px",
              borderRadius: "99px",
              background: badgeColor.bg,
              color: badgeColor.text,
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            {result.meta?.type}
          </span>
        )}
      </div>

      {!error && result && !result.valid && value.length === 10 && (
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
