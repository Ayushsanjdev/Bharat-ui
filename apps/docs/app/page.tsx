"use client";

import * as React from "react";
import Link from "next/link";
import { Nav } from "./_components/Nav";
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

function Terminal() {
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
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: "#FF5F57",
          }}
        />
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: "#FEBC2E",
          }}
        />
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: "#28C840",
          }}
        />
        <span
          style={{
            fontSize: 12,
            color: "#525252",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          validator playground
        </span>
      </div>

      <div
        style={{
          display: "flex",
          borderBottom: "0.5px solid #1C1C1C",
          overflowX: "auto",
        }}
      >
        {VALIDATORS.map((v) => (
          <button
            key={v.id}
            onClick={() => handleTabChange(v.id, v.placeholder)}
            style={{
              padding: "8px 14px",
              fontSize: 11,
              fontFamily: "var(--font-mono)",
              border: "none",
              borderBottom:
                activeId === v.id
                  ? "1.5px solid #F59E0B"
                  : "1.5px solid transparent",
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
        <div style={{ fontSize: 11, color: "#4C4C4C", marginBottom: 8 }}>
          // input
        </div>
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
          onFocus={(e) => {
            e.target.style.borderColor = "#F59E0B";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "#1C1C1C";
          }}
        />

        <div style={{ fontSize: 11, color: "#4C4C4C", marginBottom: 8 }}>
          // output
        </div>
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
              v !== undefined && v !== "" ? (
                <JsonLine key={k} k={k} v={v} />
              ) : null,
            )
          ) : (
            <span style={{ color: "#4C4C4C" }}>// type a value above...</span>
          )}
        </div>
      </div>
    </div>
  );
}

const QS_SNIPPETS = {
  validators: {
    install: "npm install @bharat-ui/validators",
    code: `import { validatePAN, formatINR } from "@bharat-ui/validators";

validatePAN("ABCPE1234F");
// { valid: true, type: "Individual" }

formatINR(1234567);
// "₹12,34,567"`,
  },
  react: {
    install: "npm install @bharat-ui/react",
    code: `import { PANInput } from "@bharat-ui/react/PANInput";

function MyForm() {
  const [pan, setPan] = React.useState("");
  return (
    <PANInput
      label="PAN number"
      value={pan}
      onChange={setPan}
    />
  );
}`,
  },
};

function QsCodeBlock({ code }: { code: string }) {
  return (
    <div
      style={{
        padding: 20,
        fontFamily: "var(--font-mono)",
        fontSize: 13,
        lineHeight: 1.9,
      }}
    >
      {code.split("\n").map((line, i) => (
        <div
          key={i}
          style={{
            color: line.startsWith("//") ? "#4C4C4C" : "#FAFAF9",
            minHeight: "1.9em",
          }}
        >
          {line || " "}
        </div>
      ))}
    </div>
  );
}

export default function Page() {
  const [panValue, setPanValue] = React.useState("");
  const [pincodeValue, setPincodeValue] = React.useState("");
  const [amountValue, setAmountValue] = React.useState<number | undefined>();
  const [copied, setCopied] = React.useState(false);
  const [qsTab, setQsTab] = React.useState<"validators" | "react">("validators");
  const [qsCopied, setQsCopied] = React.useState(false);

  const copyQs = () => {
    const { install, code } = QS_SNIPPETS[qsTab];
    navigator.clipboard.writeText(`${install}\n\n${code}`);
    setQsCopied(true);
    setTimeout(() => setQsCopied(false), 1500);
  };

  const copy = () => {
    navigator.clipboard.writeText("npm install @bharat-ui/validators");
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div style={{ fontFamily: "var(--font-sans)" }}>
      <Nav />

      {/* Hero — dark */}
      <section
        style={{
          background: "#0A0A0A",
          padding: "80px 32px 80px",
          borderBottom: "0.5px solid #1C1C1C",
        }}
      >
        <div
          style={{
            maxWidth: 1000,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 56,
            alignItems: "center",
          }}
        >
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 11,
                fontWeight: 600,
                padding: "4px 10px",
                borderRadius: 99,
                background: "#1C1C1C",
                color: "#F59E0B",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#F59E0B",
                }}
              />
              Open source · Made in India
            </div>

            <h1
              style={{
                fontSize: 44,
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                color: "#FAFAF9",
                marginBottom: 16,
              }}
            >
              The missing UI layer
              <br />
              for <span style={{ color: "#F59E0B" }}>Indian products</span>
            </h1>

            <p
              style={{
                fontSize: 15,
                color: "#78716C",
                lineHeight: 1.75,
                marginBottom: 28,
              }}
            >
              PAN, Aadhaar, IFSC, UPI, OTP and ₹ formatting — built once,
              tested, typed, open source. Stop rebuilding the same validators in
              every project.
            </p>

            <div
              style={{
                background: "#111",
                border: "0.5px solid #1C1C1C",
                borderRadius: 8,
                padding: "12px 16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 20,
              }}
            >
              <code
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 13,
                  color: "#F59E0B",
                }}
              >
                npm install @bharat-ui/validators
              </code>
              <button
                onClick={copy}
                style={{
                  fontSize: 11,
                  padding: "4px 10px",
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

            <div style={{ display: "flex", gap: 28 }}>
              {[
                { n: "5", l: "Validators" },
                { n: "37", l: "Tests passing" },
                { n: "0", l: "Dependencies" },
                { n: "2", l: "npm packages" },
              ].map((s) => (
                <div
                  key={s.l}
                  style={{ display: "flex", flexDirection: "column", gap: 2 }}
                >
                  <span
                    style={{ fontSize: 22, fontWeight: 700, color: "#FAFAF9" }}
                  >
                    {s.n}
                  </span>
                  <span style={{ fontSize: 11, color: "#78716C" }}>{s.l}</span>
                </div>
              ))}
            </div>
          </div>

          <Terminal />
        </div>
      </section>

      {/* Quick Start */}
      <section
        id="quick-start"
        style={{
          background: "#0A0A0A",
          padding: "72px 32px",
          borderBottom: "0.5px solid #1C1C1C",
        }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#F59E0B",
              marginBottom: 8,
            }}
          >
            Quick Start
          </div>
          <h2
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: "#FAFAF9",
              marginBottom: 32,
              letterSpacing: "-0.01em",
            }}
          >
            From install to working in 60 seconds
          </h2>

          <div
            style={{
              background: "#111",
              border: "0.5px solid #1C1C1C",
              borderRadius: 16,
              overflow: "hidden",
            }}
          >
            <div style={{ display: "flex", borderBottom: "0.5px solid #1C1C1C" }}>
              {(["validators", "react"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setQsTab(tab);
                    setQsCopied(false);
                  }}
                  style={{
                    padding: "8px 14px",
                    fontSize: 11,
                    fontFamily: "var(--font-mono)",
                    border: "none",
                    borderBottom:
                      qsTab === tab
                        ? "1.5px solid #F59E0B"
                        : "1.5px solid transparent",
                    background: "transparent",
                    color: qsTab === tab ? "#F59E0B" : "#525252",
                    cursor: "pointer",
                    transition: "color 0.15s",
                  }}
                >
                  @bharat-ui/{tab}
                </button>
              ))}
            </div>

            <div
              style={{
                padding: "12px 20px",
                borderBottom: "0.5px solid #1C1C1C",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <code
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 13,
                  color: "#86EFAC",
                }}
              >
                <span style={{ color: "#525252" }}>$ </span>
                {QS_SNIPPETS[qsTab].install}
              </code>
              <button
                onClick={copyQs}
                style={{
                  fontSize: 11,
                  padding: "4px 10px",
                  borderRadius: 4,
                  background: "#1C1C1C",
                  color: qsCopied ? "#86EFAC" : "#78716C",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "var(--font-sans)",
                  transition: "color 0.2s",
                }}
              >
                {qsCopied ? "Copied!" : "Copy"}
              </button>
            </div>

            <QsCodeBlock code={QS_SNIPPETS[qsTab].code} />
          </div>
        </div>
      </section>

      {/* Validators — dark */}
      <section
        style={{
          background: "#0A0A0A",
          padding: "72px 32px",
          borderBottom: "0.5px solid #1C1C1C",
        }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#F59E0B",
              marginBottom: 8,
            }}
          >
            @bharat-ui/validators
          </div>
          <h2
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: "#FAFAF9",
              marginBottom: 8,
              letterSpacing: "-0.01em",
            }}
          >
            Every Indian data format, validated
          </h2>
          <p style={{ fontSize: 14, color: "#525252", marginBottom: 32 }}>
            Zero dependencies. TypeScript-first. Works in React, React Native,
            and Node.js.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 12,
            }}
          >
            {[
              {
                icon: "🪪",
                title: "Aadhaar",
                desc: "12-digit with Verhoeff checksum. Returns masked version for privacy.",
                tag: "validateAadhaar()",
              },
              {
                icon: "📋",
                title: "PAN",
                desc: "Format + taxpayer type inference — Individual, Company, Trust and more.",
                tag: "validatePAN()",
              },
              {
                icon: "🏦",
                title: "IFSC",
                desc: "Format check + RBI dataset. Returns bank, branch, city, state.",
                tag: "validateIFSC()",
              },
              {
                icon: "📮",
                title: "Pincode",
                desc: "India Post dataset. Resolves district, state, zone, head PO instantly.",
                tag: "validatePincode()",
              },
              {
                icon: "₹",
                title: "INR format",
                desc: "Indian commas, lakh and crore notation. ₹12,34,567 not ₹1,234,567.",
                tag: "formatINR()",
              },
              {
                icon: "✦",
                title: "More in v0.2.0",
                desc: "GST, UPI ID, Vehicle registration, Indian mobile inference.",
                tag: "coming soon",
                accent: true,
              },
            ].map((c) => (
              <div
                key={c.title}
                style={{
                  background: c.accent ? "#111108" : "#111",
                  border: `0.5px solid ${c.accent ? "#F59E0B33" : "#1C1C1C"}`,
                  borderRadius: 12,
                  padding: 20,
                }}
              >
                <div style={{ fontSize: 20, marginBottom: 10 }}>{c.icon}</div>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: c.accent ? "#F59E0B" : "#FAFAF9",
                    marginBottom: 4,
                  }}
                >
                  {c.title}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "#525252",
                    lineHeight: 1.6,
                    marginBottom: 10,
                  }}
                >
                  {c.desc}
                </div>
                <code
                  style={{
                    fontSize: 10,
                    padding: "2px 6px",
                    borderRadius: 4,
                    background: "#1C1C1C",
                    color: "#F59E0B",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {c.tag}
                </code>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Components — light */}
      <section
        style={{
          background: "#FAFAF9",
          padding: "72px 32px",
          borderBottom: "0.5px solid #E7E5E4",
        }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#F59E0B",
              marginBottom: 8,
            }}
          >
            @bharat-ui/react
          </div>
          <h2
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: "#0A0A0A",
              marginBottom: 8,
              letterSpacing: "-0.01em",
            }}
          >
            React components built on top
          </h2>
          <p style={{ fontSize: 14, color: "#78716C", marginBottom: 40 }}>
            Each component wires up the validator, formats correctly, and
            handles every edge case. Interactive below — try them.
          </p>

          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
          >
            <div
              style={{
                background: "#fff",
                border: "0.5px solid #E7E5E4",
                borderRadius: 12,
                padding: 24,
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: "#78716C",
                  fontFamily: "var(--font-mono)",
                  marginBottom: 16,
                }}
              >
                &lt;AmountInput /&gt;
              </div>
              <AmountInput
                label="Loan amount"
                placeholder="Enter amount"
                value={amountValue}
                onChange={(raw) => setAmountValue(raw)}
              />
            </div>

            <div
              style={{
                background: "#fff",
                border: "0.5px solid #E7E5E4",
                borderRadius: 12,
                padding: 24,
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: "#78716C",
                  fontFamily: "var(--font-mono)",
                  marginBottom: 16,
                }}
              >
                &lt;OTPInput /&gt;
              </div>
              <OTPInput
                label="Enter OTP sent to +91 98765 43210"
                length={6}
                resendAfterSeconds={30}
                onComplete={(otp) => console.log("OTP:", otp)}
                onResend={() => console.log("Resend")}
              />
            </div>

            <div
              style={{
                background: "#fff",
                border: "0.5px solid #E7E5E4",
                borderRadius: 12,
                padding: 24,
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: "#78716C",
                  fontFamily: "var(--font-mono)",
                  marginBottom: 16,
                }}
              >
                &lt;PANInput /&gt;
              </div>
              <PANInput
                label="PAN number"
                value={panValue}
                onChange={(v) => setPanValue(v)}
              />
            </div>

            <div
              style={{
                background: "#fff",
                border: "0.5px solid #E7E5E4",
                borderRadius: 12,
                padding: 24,
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: "#78716C",
                  fontFamily: "var(--font-mono)",
                  marginBottom: 16,
                }}
              >
                &lt;PincodeInput /&gt;
              </div>
              <PincodeInput
                label="Pincode"
                value={pincodeValue}
                onChange={(v) => setPincodeValue(v)}
              />
            </div>

            <div
              style={{
                background: "#fff",
                border: "0.5px solid #E7E5E4",
                borderRadius: 12,
                padding: 24,
                gridColumn: "1 / -1",
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: "#78716C",
                  fontFamily: "var(--font-mono)",
                  marginBottom: 16,
                }}
              >
                &lt;UPIButton /&gt;
              </div>
              <div style={{ maxWidth: 400 }}>
                <UPIButton
                  vpa="merchant@okaxis"
                  amount={amountValue ?? 1234}
                  merchantName="Bharat UI Demo"
                  transactionNote="Test payment"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why — dark */}
      <section
        style={{
          background: "#0A0A0A",
          padding: "72px 32px",
          borderBottom: "0.5px solid #1C1C1C",
        }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#F59E0B",
              marginBottom: 8,
            }}
          >
            Why Bharat UI
          </div>
          <h2
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: "#FAFAF9",
              marginBottom: 40,
              letterSpacing: "-0.01em",
            }}
          >
            Built for the constraints Indian products actually face
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 24,
            }}
          >
            {[
              {
                title: "Indian number system",
                body: "₹12,34,567 not ₹1,234,567. Lakh and crore notation. Every western library gets this wrong.",
              },
              {
                title: "Indic typography",
                body: "Devanagari vowel marks clip at line-height 1.4. Bharat UI ships correct per-script defaults.",
              },
              {
                title: "Zero network calls",
                body: "IFSC and pincode datasets are bundled. Instant lookup, works offline, no API dependency.",
              },
              {
                title: "Consistent API",
                body: "Every validator returns { valid, formatted, error?, meta? }. Learn it once, use it everywhere.",
              },
              {
                title: "Tested edge cases",
                body: "37 tests covering real-world inputs — Verhoeff checksums, retired IFSC codes, leading zeros.",
              },
              {
                title: "Tree-shakeable",
                body: "Import only what you need. @bharat-ui/validators has zero runtime dependencies.",
              },
            ].map((w) => (
              <div key={w.title}>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#FAFAF9",
                    marginBottom: 6,
                  }}
                >
                  {w.title}
                </div>
                <div
                  style={{ fontSize: 13, color: "#525252", lineHeight: 1.7 }}
                >
                  {w.body}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — saffron */}
      <section style={{ background: "#F59E0B", padding: "72px 32px" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <h2
            style={{
              fontSize: 32,
              fontWeight: 800,
              color: "#0A0A0A",
              marginBottom: 12,
              letterSpacing: "-0.02em",
            }}
          >
            Start building for Bharat
          </h2>
          <p
            style={{
              fontSize: 15,
              color: "#78350F",
              marginBottom: 32,
              lineHeight: 1.7,
            }}
          >
            Two packages on npm. 37 passing tests. Ready to use in your next
            Indian product.
          </p>
          <div
            style={{
              background: "#0A0A0A",
              borderRadius: 8,
              padding: "12px 20px",
              display: "inline-flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <code
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 14,
                color: "#F59E0B",
              }}
            >
              npm install @bharat-ui/validators
            </code>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          background: "#0A0A0A",
          padding: "28px 32px",
          borderTop: "0.5px solid #1C1C1C",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 12,
          color: "#525252",
        }}
      >
        <span style={{ fontFamily: "var(--font-mono)" }}>
          Bharat UI — open source, built for India
        </span>
        <div style={{ display: "flex", gap: 20 }}>
          {[
            {
              label: "npm",
              href: "https://npmjs.com/package/@bharat-ui/validators",
            },
            { label: "GitHub", href: "#" },
            {
              label: "@bharat-ui/data",
              href: "https://npmjs.com/package/@bharat-ui/data",
            },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              style={{ color: "#525252", textDecoration: "none" }}
            >
              {l.label}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}
