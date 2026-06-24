"use client";

import * as React from "react";
import { Terminal } from "./Terminal";
import { useIsMobile } from "./useIsMobile";

export function HeroSection() {
  const isMobile = useIsMobile();
  const [copied, setCopied] = React.useState(false);

  const copy = () => {
    navigator.clipboard.writeText("npm install @bharat-ui/validators");
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <section
      style={{
        background: "var(--bg)",
        padding: isMobile ? "48px 20px" : "80px 32px",
        borderBottom: "0.5px solid var(--border)",
      }}
    >
      <div
        style={{
          maxWidth: 1000,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? 40 : 56,
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
              background: "var(--accent-bg)",
              color: "var(--accent)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              marginBottom: 20,
            }}
          >
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)" }} />
            Open source · Made in India
          </div>

          <h1
            style={{
              fontSize: isMobile ? 32 : 44,
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "var(--text)",
              marginBottom: 16,
            }}
          >
            The missing UI layer
            <br />
            for <span style={{ color: "var(--accent)" }}>Indian products</span>
          </h1>

          <p
            style={{
              fontSize: isMobile ? 14 : 15,
              color: "var(--text-muted)",
              lineHeight: 1.75,
              marginBottom: 28,
            }}
          >
            PAN, Aadhaar, IFSC, UPI, OTP and ₹ formatting — built once, tested, typed, open
            source. Stop rebuilding the same validators in every project.
          </p>

          <div
            style={{
              background: "var(--surface)",
              border: "0.5px solid var(--border)",
              borderRadius: 8,
              padding: "12px 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 20,
              gap: 8,
            }}
          >
            <code
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: isMobile ? 11 : 13,
                color: "var(--accent)",
                wordBreak: "break-all",
              }}
            >
              npm install @bharat-ui/validators
            </code>
            <button
              onClick={copy}
              style={{
                flexShrink: 0,
                fontSize: 11,
                padding: "4px 10px",
                borderRadius: 4,
                background: "var(--border)",
                color: copied ? "#86EFAC" : "var(--text-muted)",
                border: "none",
                cursor: "pointer",
                fontFamily: "var(--font-sans)",
                transition: "color 0.2s",
              }}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>

          <div style={{ display: "flex", gap: isMobile ? 20 : 28, flexWrap: "wrap" }}>
            {[
              { n: "5", l: "Validators" },
              { n: "37", l: "Tests passing" },
              { n: "0", l: "Dependencies" },
              { n: "2", l: "npm packages" },
            ].map((s) => (
              <div key={s.l} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <span style={{ fontSize: 22, fontWeight: 700, color: "var(--text)" }}>{s.n}</span>
                <span style={{ fontSize: 11, color: "var(--text-muted)" }}>{s.l}</span>
              </div>
            ))}
          </div>
        </div>

        <Terminal />
      </div>
    </section>
  );
}
