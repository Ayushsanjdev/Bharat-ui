"use client";

import { useIsMobile } from "./useIsMobile";

const FOOTER_LINKS = [
  { label: "npm", href: "https://npmjs.com/package/@bharat-ui/validators" },
  { label: "GitHub", href: "https://github.com/Ayushsanjdev/Bharat-ui" },
  { label: "@bharat-ui/data", href: "https://npmjs.com/package/@bharat-ui/data" },
];

export function FooterSection() {
  const isMobile = useIsMobile();

  return (
    <footer
      style={{
        background: "var(--bg)",
        padding: isMobile ? "24px 20px" : "28px 32px",
        borderTop: "0.5px solid var(--border)",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        justifyContent: "space-between",
        alignItems: isMobile ? "flex-start" : "center",
        gap: isMobile ? 16 : 0,
        fontSize: 12,
        color: "var(--text-dim)",
      }}
    >
      <span style={{ fontFamily: "var(--font-mono)" }}>
        Bharat UI — open source, built for India
      </span>
      <div style={{ display: "flex", gap: 20 }}>
        {FOOTER_LINKS.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--text-dim)", textDecoration: "none" }}
          >
            {l.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
