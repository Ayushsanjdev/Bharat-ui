"use client";

import * as React from "react";
import Link from "next/link";
import { useIsMobile } from "./useIsMobile";
import { useTheme } from "./ThemeProvider";

const NAV_LINKS = [
  { label: "Docs", href: "/docs", external: false },
  { label: "Components", href: "/components", external: false },
  { label: "Playground", href: "/playground", external: false },
  { label: "GitHub", href: "https://github.com/Ayushsanjdev/Bharat-ui", external: true },
];

function ThemeToggle({ size = 32 }: { size?: number }) {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      style={{
        width: size,
        height: size,
        borderRadius: 6,
        background: "var(--surface)",
        border: "0.5px solid var(--border)",
        color: "var(--text-muted)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 15,
        transition: "background 0.2s, color 0.2s",
        flexShrink: 0,
      }}
    >
      {theme === "dark" ? "☀" : "🌙"}
    </button>
  );
}

export function Nav() {
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: isMobile ? "0 20px" : "0 32px",
        height: 56,
        borderBottom: "0.5px solid var(--border)",
        background: "var(--nav-bg)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Link
          href="/"
          style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}
        >
          <div
            style={{
              width: 26,
              height: 26,
              background: "var(--accent)",
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="3" stroke="#0A0A0A" strokeWidth="1.5" />
              <line x1="7" y1="1" x2="7" y2="13" stroke="#0A0A0A" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="1" y1="7" x2="13" y2="7" stroke="#0A0A0A" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <span style={{ fontWeight: 700, fontSize: 15, color: "var(--text)" }}>Bharat UI</span>
        </Link>
        <span
          style={{
            fontSize: 11,
            padding: "2px 6px",
            borderRadius: 4,
            background: "var(--surface)",
            color: "var(--text-muted)",
            fontFamily: "var(--font-mono)",
            border: "0.5px solid var(--border)",
          }}
        >
          v0.1.4
        </span>
      </div>

      {/* Desktop nav */}
      {!isMobile && (
        <>
          <div style={{ display: "flex", gap: 20, fontSize: 13 }}>
            {NAV_LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                target={l.external ? "_blank" : undefined}
                rel={l.external ? "noopener noreferrer" : undefined}
                style={{ color: "var(--text-muted)", textDecoration: "none" }}
              >
                {l.label}
              </Link>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <ThemeToggle />
            <Link
              href="/docs"
              style={{
                fontSize: 13,
                padding: "7px 16px",
                borderRadius: 6,
                background: "var(--accent)",
                color: "#0A0A0A",
                fontWeight: 700,
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              Get started
            </Link>
          </div>
        </>
      )}

      {/* Mobile: theme toggle + hamburger */}
      {isMobile && (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <ThemeToggle size={30} />
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
              style={{
                background: "transparent",
                border: "none",
                color: "var(--text)",
                fontSize: 20,
                cursor: "pointer",
                padding: "4px 8px",
                lineHeight: 1,
              }}
            >
              {menuOpen ? "✕" : "☰"}
            </button>

            {menuOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 8px)",
                  right: 0,
                  background: "var(--surface)",
                  border: "0.5px solid var(--border)",
                  borderRadius: 10,
                  overflow: "hidden",
                  minWidth: 180,
                  boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                }}
              >
                {NAV_LINKS.map((l) => (
                  <Link
                    key={l.label}
                    href={l.href}
                    target={l.external ? "_blank" : undefined}
                    rel={l.external ? "noopener noreferrer" : undefined}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      display: "block",
                      padding: "12px 20px",
                      fontSize: 14,
                      color: "var(--text)",
                      textDecoration: "none",
                      borderBottom: "0.5px solid var(--border)",
                    }}
                  >
                    {l.label}
                  </Link>
                ))}
                <Link
                  href="/docs"
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: "block",
                    padding: "12px 20px",
                    fontSize: 14,
                    fontWeight: 700,
                    color: "var(--accent)",
                    textDecoration: "none",
                  }}
                >
                  Get started →
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
