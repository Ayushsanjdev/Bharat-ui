"use client";

import { validateIFSC } from "@bharat-ui/validators";
import * as React from "react";
import type { IFSCData, IFSCResolver } from "./types";

export type { IFSCData, IFSCResolver };

export interface IFSCInputProps {
  value?: string;
  onChange?: (value: string, valid: boolean) => void;
  label?: string;
  error?: string;
  disabled?: boolean;
  showDetails?: boolean;
  resolver?: IFSCResolver;
}

export function IFSCInput({
  value = "",
  onChange,
  label,
  error,
  disabled = false,
  showDetails = true,
  resolver,
}: IFSCInputProps) {
  const [focused, setFocused] = React.useState(false);
  const [resolvedData, setResolvedData] = React.useState<IFSCData | null>(null);
  const [resolving, setResolving] = React.useState(false);

  const result = value.length === 11 ? validateIFSC(value) : null;

  React.useEffect(() => {
    if (!resolver || !result?.valid) {
      setResolvedData(null);
      return;
    }
    let cancelled = false;
    setResolving(true);
    resolver(value).then((data) => {
      if (!cancelled) {
        setResolvedData(data);
        setResolving(false);
      }
    });
    return () => { cancelled = true; };
  }, [value, resolver, result?.valid]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 11);
    onChange?.(cleaned, cleaned.length === 11 ? validateIFSC(cleaned).valid : false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      {label && (
        <label style={{ fontSize: "13px", fontWeight: 500, color: error ? "#dc2626" : "#6b7280" }}>
          {label}
        </label>
      )}

      <input
        type="text"
        value={value}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        disabled={disabled}
        maxLength={11}
        placeholder="SBIN0001234"
        style={{
          border: `1.5px solid ${error ? "#dc2626" : focused ? "#B45309" : "#d1d5db"}`,
          borderRadius: "8px",
          padding: "10px 12px",
          fontSize: "15px",
          fontFamily: "var(--font-mono, monospace)",
          letterSpacing: "0.1em",
          outline: "none",
          background: disabled ? "#f9fafb" : "#ffffff",
          color: "#111827",
          width: "100%",
          boxSizing: "border-box",
          boxShadow: focused ? "0 0 0 3px rgba(180,83,9,0.12)" : "none",
          transition: "all 0.15s ease",
          textTransform: "uppercase",
        }}
      />

      {showDetails && result?.valid && resolver && (
        resolving ? (
          <div style={{ padding: "10px 12px", background: "#f9fafb", borderRadius: "8px", border: "0.5px solid #e5e7eb", fontSize: "12px", color: "#9ca3af" }}>
            Looking up...
          </div>
        ) : resolvedData ? (
          <BankCard data={resolvedData} />
        ) : null
      )}

      {result && !result.valid && value.length === 11 && !error && (
        <span style={{ fontSize: "12px", color: "#dc2626" }}>{result.error}</span>
      )}

      {error && <span style={{ fontSize: "12px", color: "#dc2626" }}>{error}</span>}
    </div>
  );
}

function BankCard({ data }: { data: IFSCData }) {
  const rows = [
    { label: "Bank", value: data.bank },
    data.branch ? { label: "Branch", value: data.branch } : null,
    data.city ? { label: "City", value: data.city } : null,
    data.state ? { label: "State", value: data.state } : null,
    data.address ? { label: "Address", value: data.address } : null,
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px", padding: "10px 12px", background: "#f9fafb", borderRadius: "8px", border: "0.5px solid #e5e7eb", marginTop: "2px" }}>
      {rows.map((row) => (
        <div key={row.label} style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", gap: "12px" }}>
          <span style={{ color: "#6b7280", flexShrink: 0 }}>{row.label}</span>
          <span style={{ fontWeight: 500, color: "#111827", textAlign: "right" }}>{row.value}</span>
        </div>
      ))}
    </div>
  );
}
