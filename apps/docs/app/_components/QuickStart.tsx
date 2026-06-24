"use client";

import * as React from "react";
import { useIsMobile } from "./useIsMobile";

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
    <div style={{ padding: 20, fontFamily: "var(--font-mono)", fontSize: 13, lineHeight: 1.9, overflowX: "auto" }}>
      {code.split("\n").map((line, i) => (
        <div
          key={i}
          style={{ color: line.startsWith("//") ? "#4C4C4C" : "#FAFAF9", minHeight: "1.9em", whiteSpace: "pre" }}
        >
          {line || " "}
        </div>
      ))}
    </div>
  );
}

export function QuickStart() {
  const isMobile = useIsMobile();
  const [qsTab, setQsTab] = React.useState<"validators" | "react">("validators");
  const [qsCopied, setQsCopied] = React.useState(false);

  const copyQs = () => {
    const { install, code } = QS_SNIPPETS[qsTab];
    navigator.clipboard.writeText(`${install}\n\n${code}`);
    setQsCopied(true);
    setTimeout(() => setQsCopied(false), 1500);
  };

  return (
    <section
      id="quick-start"
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
          Quick Start
        </div>
        <h2
          style={{
            fontSize: isMobile ? 22 : 28,
            fontWeight: 700,
            color: "var(--text)",
            marginBottom: 32,
            letterSpacing: "-0.01em",
          }}
        >
          From install to working in 60 seconds
        </h2>

        {/* Code block always dark — intentional */}
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
                onClick={() => { setQsTab(tab); setQsCopied(false); }}
                style={{
                  padding: "8px 14px",
                  fontSize: 11,
                  fontFamily: "var(--font-mono)",
                  border: "none",
                  borderBottom: qsTab === tab ? "1.5px solid #F59E0B" : "1.5px solid transparent",
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
              padding: isMobile ? "10px 16px" : "12px 20px",
              borderBottom: "0.5px solid #1C1C1C",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 8,
              overflowX: "auto",
            }}
          >
            <code style={{ fontFamily: "var(--font-mono)", fontSize: isMobile ? 11 : 13, color: "#86EFAC", whiteSpace: "nowrap" }}>
              <span style={{ color: "#525252" }}>$ </span>
              {QS_SNIPPETS[qsTab].install}
            </code>
            <button
              onClick={copyQs}
              style={{
                flexShrink: 0,
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
  );
}
