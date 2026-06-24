"use client";

import * as React from "react";
import { AmountInput } from "@bharat-ui/react/AmountInput";
import { OTPInput } from "@bharat-ui/react/OTPInput";
import { PANInput } from "@bharat-ui/react/PANInput";
import { PincodeInput } from "@bharat-ui/react/PincodeInput";
import { UPIButton } from "@bharat-ui/react/UPIButton";
import { useIsMobile } from "./useIsMobile";

export function ComponentsSection() {
  const isMobile = useIsMobile();
  const [panValue, setPanValue] = React.useState("");
  const [pincodeValue, setPincodeValue] = React.useState("");
  const [amountValue, setAmountValue] = React.useState<number | undefined>();

  return (
    <section
      id="components"
      style={{
        background: "var(--bg)",
        padding: isMobile ? "48px 20px" : "72px 32px",
        borderBottom: "0.5px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--accent)",
            marginBottom: 8,
          }}
        >
          @bharat-ui/react
        </div>
        <h2
          style={{
            fontSize: isMobile ? 22 : 28,
            fontWeight: 700,
            color: "var(--text)",
            marginBottom: 8,
            letterSpacing: "-0.01em",
          }}
        >
          React components built on top
        </h2>
        <p style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 40 }}>
          Each component wires up the validator, formats correctly, and handles every edge case.
          Interactive below — try them.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: 16,
          }}
        >
          <ComponentCard label="AmountInput">
            <AmountInput
              label="Loan amount"
              placeholder="Enter amount"
              value={amountValue}
              onChange={(raw) => setAmountValue(raw)}
            />
          </ComponentCard>

          <ComponentCard label="OTPInput">
            <OTPInput
              label="Enter OTP sent to +91 98765 43210"
              length={6}
              resendAfterSeconds={30}
              onComplete={(otp) => console.log("OTP:", otp)}
              onResend={() => console.log("Resend")}
            />
          </ComponentCard>

          <ComponentCard label="PANInput">
            <PANInput label="PAN number" value={panValue} onChange={(v) => setPanValue(v)} />
          </ComponentCard>

          <ComponentCard label="PincodeInput">
            <PincodeInput
              label="Pincode"
              value={pincodeValue}
              onChange={(v) => setPincodeValue(v)}
            />
          </ComponentCard>

          <ComponentCard label="UPIButton" fullWidth>
            <div style={{ maxWidth: 400 }}>
              <UPIButton
                vpa="merchant@okaxis"
                amount={amountValue ?? 1234}
                merchantName="Bharat UI Demo"
                transactionNote="Test payment"
              />
            </div>
          </ComponentCard>
        </div>
      </div>
    </section>
  );
}

function ComponentCard({
  label,
  children,
  fullWidth,
}: {
  label: string;
  children: React.ReactNode;
  fullWidth?: boolean;
}) {
  return (
    <div
      style={{
        background: "var(--surface)",
        border: "0.5px solid var(--border)",
        borderRadius: 12,
        padding: 24,
        ...(fullWidth ? { gridColumn: "1 / -1" } : {}),
      }}
    >
      <div
        style={{
          fontSize: 12,
          fontWeight: 500,
          color: "var(--text-muted)",
          fontFamily: "var(--font-mono)",
          marginBottom: 16,
        }}
      >
        &lt;{label} /&gt;
      </div>
      {children}
    </div>
  );
}
