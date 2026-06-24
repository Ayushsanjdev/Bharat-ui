"use client";

import * as React from "react";

export interface OTPInputProps {
  length?: 4 | 6;
  onComplete?: (otp: string) => void;
  onChange?: (otp: string) => void;
  resendAfterSeconds?: number;
  onResend?: () => void;
  error?: string;
  disabled?: boolean;
  label?: string;
}

export function OTPInput({
  length = 6,
  onComplete,
  onChange,
  resendAfterSeconds = 30,
  onResend,
  error,
  disabled = false,
  label,
}: OTPInputProps) {
  const [values, setValues] = React.useState<string[]>(Array(length).fill(""));
  const [seconds, setSeconds] = React.useState(resendAfterSeconds);
  const [focused, setFocused] = React.useState<number | null>(null);
  const refs = React.useRef<(HTMLInputElement | null)[]>([]);

  React.useEffect(() => {
    if (seconds <= 0) return;
    const timer = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [seconds]);

  const handleChange = (index: number, val: string) => {
    const digit = val.replace(/\D/g, "").slice(-1);
    const next = [...values];
    next[index] = digit;
    setValues(next);

    const otp = next.join("");
    onChange?.(otp);

    if (digit && index < length - 1) {
      refs.current[index + 1]?.focus();
    }

    if (next.every((v) => v !== "") && otp.length === length) {
      onComplete?.(otp);
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace") {
      if (values[index]) {
        const next = [...values];
        next[index] = "";
        setValues(next);
        onChange?.(next.join(""));
      } else if (index > 0) {
        refs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length);

    if (!pasted) return;

    const next = Array(length).fill("");
    pasted.split("").forEach((char, i) => {
      next[i] = char;
    });
    setValues(next);
    onChange?.(next.join(""));

    const lastFilled = Math.min(pasted.length, length - 1);
    refs.current[lastFilled]?.focus();

    if (pasted.length === length) {
      onComplete?.(pasted);
    }
  };

  const handleResend = () => {
    setSeconds(resendAfterSeconds);
    setValues(Array(length).fill(""));
    refs.current[0]?.focus();
    onResend?.();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
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
        style={{ display: "flex", gap: "8px" }}
        role="group"
        aria-label={label ?? "OTP input"}
      >
        {values.map((val, i) => (
          <input
            key={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={val}
            disabled={disabled}
            aria-label={`Digit ${i + 1} of ${length}`}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={handlePaste}
            onFocus={() => setFocused(i)}
            onBlur={() => setFocused(null)}
            style={{
              width: "44px",
              height: "52px",
              textAlign: "center",
              fontSize: "20px",
              fontWeight: 600,
              border: `1.5px solid ${
                error
                  ? "#dc2626"
                  : focused === i
                    ? "#B45309"
                    : val
                      ? "#B45309"
                      : "#d1d5db"
              }`,
              borderRadius: "8px",
              outline: "none",
              background: disabled ? "#f9fafb" : "#ffffff",
              color: "#111827",
              boxShadow:
                focused === i ? "0 0 0 3px rgba(180,83,9,0.12)" : "none",
              transition: "all 0.15s ease",
            }}
          />
        ))}
      </div>

      {error && (
        <span style={{ fontSize: "12px", color: "#dc2626" }}>{error}</span>
      )}

      {onResend && (
        <div style={{ fontSize: "13px", color: "#6b7280", marginTop: "4px" }}>
          {seconds > 0 ? (
            <>
              Didn't get it?{" "}
              <span style={{ color: "#B45309" }}>
                Resend in 0:{String(seconds).padStart(2, "0")}
              </span>
            </>
          ) : (
            <>
              Didn't get it?{" "}
              <button
                onClick={handleResend}
                style={{
                  background: "none",
                  border: "none",
                  color: "#B45309",
                  cursor: "pointer",
                  fontSize: "13px",
                  fontWeight: 500,
                  padding: 0,
                  textDecoration: "underline",
                }}
              >
                Resend OTP
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
