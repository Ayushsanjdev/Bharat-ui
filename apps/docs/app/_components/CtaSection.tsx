"use client";

import Link from "next/link";
import { useIsMobile } from "./useIsMobile";

export function CtaSection() {
  const isMobile = useIsMobile();

  return (
    <section style={{ background: "var(--accent)", padding: isMobile ? "48px 20px" : "72px 32px" }}>
      <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
        <h2
          style={{
            fontSize: isMobile ? 26 : 32,
            fontWeight: 800,
            color: "#0A0A0A",
            marginBottom: 12,
            letterSpacing: "-0.02em",
          }}
        >
          Start building for Bharat
        </h2>
        <p style={{ fontSize: isMobile ? 14 : 15, color: "#78350F", marginBottom: 32, lineHeight: 1.7 }}>
          Two packages on npm. 37 passing tests. Ready to use in your next Indian product.
        </p>
        <div
          style={{
            background: "#0A0A0A",
            borderRadius: 8,
            padding: isMobile ? "10px 16px" : "12px 20px",
            display: "inline-flex",
            alignItems: "center",
            gap: 16,
            maxWidth: "100%",
          }}
        >
          <code
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: isMobile ? 12 : 14,
              color: "#F59E0B",
              wordBreak: "break-all",
            }}
          >
            npm install @bharat-ui/validators
          </code>
        </div>
        <div style={{ marginTop: 20 }}>
          <Link
            href="/docs"
            style={{ fontSize: 14, color: "#78350F", textDecoration: "none", fontWeight: 600 }}
          >
            Read the docs →
          </Link>
        </div>
      </div>
    </section>
  );
}
