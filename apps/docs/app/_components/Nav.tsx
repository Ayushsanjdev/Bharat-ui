import Link from "next/link";

const NAV_LINKS = [
  { label: "Docs", href: "/docs" },
  { label: "Components", href: "/components" },
  { label: "Playground", href: "/playground" },
  { label: "GitHub", href: "#" },
];

export function Nav() {
  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 32px",
        height: 56,
        borderBottom: "0.5px solid #1C1C1C",
        background: "rgba(10,10,10,0.9)",
        backdropFilter: "blur(8px)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            textDecoration: "none",
          }}
        >
          <div
            style={{
              width: 26,
              height: 26,
              background: "#F59E0B",
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
          <span style={{ fontWeight: 700, fontSize: 15, color: "#FAFAF9" }}>
            Bharat UI
          </span>
        </Link>
        <span
          style={{
            fontSize: 11,
            padding: "2px 6px",
            borderRadius: 4,
            background: "#1C1C1C",
            color: "#78716C",
            fontFamily: "var(--font-mono)",
          }}
        >
          v0.1.0
        </span>
      </div>

      <div style={{ display: "flex", gap: 20, fontSize: 13 }}>
        {NAV_LINKS.map((l) => (
          <Link
            key={l.label}
            href={l.href}
            style={{ color: "#78716C", textDecoration: "none" }}
          >
            {l.label}
          </Link>
        ))}
      </div>

      <Link
        href="/docs"
        style={{
          fontSize: 13,
          padding: "7px 16px",
          borderRadius: 6,
          background: "#F59E0B",
          color: "#0A0A0A",
          fontWeight: 700,
          textDecoration: "none",
          display: "inline-block",
        }}
      >
        Get started
      </Link>
    </nav>
  );
}
