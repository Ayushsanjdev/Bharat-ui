# Docs Landing Page Refinement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refine the Bharat UI docs landing page by extracting a shared Nav component, adding routed stub pages for /docs, /components, and /playground, inserting a Quick Start section with a tabbed code block between the Hero and Validators sections, wiring section IDs, and adding a "Read the docs" link in the CTA.

**Architecture:** The shared Nav component lives in `app/_components/Nav.tsx` and is imported by both `page.tsx` and the three stub pages. The Quick Start section is a self-contained block added to `page.tsx`, using React state for tab switching and clipboard copy. All other changes are localized markup additions to existing sections.

**Tech Stack:** Next.js 13+ App Router, React 18, TypeScript, inline styles (existing pattern), `next/link`, bun

## Global Constraints
- All styling must use inline styles — no CSS modules, Tailwind, or styled-components (matches existing pattern)
- Font variables: `var(--font-sans)` = Plus Jakarta Sans, `var(--font-mono)` = JetBrains Mono
- Color palette: `#0A0A0A` dark bg · `#111` dark surface · `#1C1C1C` dark border · `#F59E0B` amber · `#FAFAF9` light text · `#78716C` muted · `#525252` dim · `#86EFAC` green · `#93C5FD` blue
- Border: `0.5px solid #1C1C1C` (dark sections) · `0.5px solid #E7E5E4` (light sections)
- No new npm dependencies

---

### Task 1: Extract shared Nav component

**Files:**
- Create: `apps/docs/app/_components/Nav.tsx`
- Modify: `apps/docs/app/page.tsx`

**Interfaces:**
- Produces: `Nav()` — React component, no props. Renders sticky nav with logo + 4 links + "Get started" CTA. Logo → `/`, Docs → `/docs`, Components → `/components`, Playground → `/playground`, GitHub → `#`, Get started → `/docs`.

- [ ] **Step 1: Create `apps/docs/app/_components/Nav.tsx`**

```tsx
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
```

- [ ] **Step 2: Update `apps/docs/app/page.tsx` — add imports and replace inline nav**

Add these two imports at the top of the file, after `"use client"` and the existing imports:

```tsx
import Link from "next/link";
import { Nav } from "./_components/Nav";
```

Then find and remove the entire `{/* Nav */}` block — it starts with:
```tsx
      {/* Nav */}
      <nav
        style={{
          display: "flex",
```
and ends with the closing `</nav>` tag before `{/* Hero — dark */}`. Replace that entire block with:
```tsx
      <Nav />
```

- [ ] **Step 3: Run type check**

```bash
cd /Users/ayushsanj/Documents/bharat-ui && bun run build --filter=docs 2>&1 | tail -20
```

Expected: build completes with no TypeScript errors.

- [ ] **Step 4: Start dev server and visually verify**

```bash
cd /Users/ayushsanj/Documents/bharat-ui/apps/docs && bun run dev
```

Open `http://localhost:3000`. Confirm:
- Nav renders and is sticky on scroll
- Logo click navigates to `/`
- Nav links "Docs", "Components", "Playground", "GitHub" are visible
- "Get started" button is amber

- [ ] **Step 5: Commit**

```bash
git add apps/docs/app/_components/Nav.tsx apps/docs/app/page.tsx
git commit -m "refactor(docs): extract shared Nav component with next/link routing"
```

---

### Task 2: Stub pages for /docs, /components, /playground

**Files:**
- Create: `apps/docs/app/docs/page.tsx`
- Create: `apps/docs/app/components/page.tsx`
- Create: `apps/docs/app/playground/page.tsx`

**Interfaces:**
- Consumes: `Nav` from `../_components/Nav` — `export function Nav()`, no props

- [ ] **Step 1: Create `apps/docs/app/docs/page.tsx`**

```tsx
import { Nav } from "../_components/Nav";

export const metadata = { title: "Docs — Bharat UI" };

export default function DocsPage() {
  return (
    <div style={{ fontFamily: "var(--font-sans)" }}>
      <Nav />
      <main
        style={{
          background: "#0A0A0A",
          minHeight: "calc(100vh - 56px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          padding: 32,
        }}
      >
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#F59E0B",
          }}
        >
          Documentation
        </div>
        <h1
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: "#FAFAF9",
            letterSpacing: "-0.01em",
            textAlign: "center",
          }}
        >
          Coming soon
        </h1>
        <p
          style={{
            fontSize: 14,
            color: "#525252",
            textAlign: "center",
            maxWidth: 400,
            lineHeight: 1.7,
          }}
        >
          Full documentation is in progress. Check the{" "}
          <a
            href="https://npmjs.com/package/@bharat-ui/validators"
            style={{ color: "#F59E0B", textDecoration: "none" }}
          >
            npm page
          </a>{" "}
          or README in the meantime.
        </p>
      </main>
    </div>
  );
}
```

- [ ] **Step 2: Create `apps/docs/app/components/page.tsx`**

```tsx
import { Nav } from "../_components/Nav";

export const metadata = { title: "Components — Bharat UI" };

export default function ComponentsPage() {
  return (
    <div style={{ fontFamily: "var(--font-sans)" }}>
      <Nav />
      <main
        style={{
          background: "#0A0A0A",
          minHeight: "calc(100vh - 56px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          padding: 32,
        }}
      >
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#F59E0B",
          }}
        >
          Components
        </div>
        <h1
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: "#FAFAF9",
            letterSpacing: "-0.01em",
            textAlign: "center",
          }}
        >
          Coming soon
        </h1>
        <p
          style={{
            fontSize: 14,
            color: "#525252",
            textAlign: "center",
            maxWidth: 400,
            lineHeight: 1.7,
          }}
        >
          Component documentation is in progress. See the live demos on the{" "}
          <a href="/" style={{ color: "#F59E0B", textDecoration: "none" }}>
            landing page
          </a>{" "}
          for now.
        </p>
      </main>
    </div>
  );
}
```

- [ ] **Step 3: Create `apps/docs/app/playground/page.tsx`**

```tsx
import { Nav } from "../_components/Nav";

export const metadata = { title: "Playground — Bharat UI" };

export default function PlaygroundPage() {
  return (
    <div style={{ fontFamily: "var(--font-sans)" }}>
      <Nav />
      <main
        style={{
          background: "#0A0A0A",
          minHeight: "calc(100vh - 56px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          padding: 32,
        }}
      >
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#F59E0B",
          }}
        >
          Playground
        </div>
        <h1
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: "#FAFAF9",
            letterSpacing: "-0.01em",
            textAlign: "center",
          }}
        >
          Coming soon
        </h1>
        <p
          style={{
            fontSize: 14,
            color: "#525252",
            textAlign: "center",
            maxWidth: 400,
            lineHeight: 1.7,
          }}
        >
          An interactive playground is in progress. Try the{" "}
          <a
            href="/#validators"
            style={{ color: "#F59E0B", textDecoration: "none" }}
          >
            validator terminal
          </a>{" "}
          on the landing page in the meantime.
        </p>
      </main>
    </div>
  );
}
```

- [ ] **Step 4: Verify all three routes**

With the dev server running at `http://localhost:3000`, open each route and confirm it shows the Nav + centered placeholder:
- `http://localhost:3000/docs` — label "Documentation", heading "Coming soon"
- `http://localhost:3000/components` — label "Components", heading "Coming soon"
- `http://localhost:3000/playground` — label "Playground", heading "Coming soon"

- [ ] **Step 5: Commit**

```bash
git add apps/docs/app/docs/page.tsx apps/docs/app/components/page.tsx apps/docs/app/playground/page.tsx
git commit -m "feat(docs): add stub pages for /docs, /components, /playground routes"
```

---

### Task 3: Quick Start section

**Files:**
- Modify: `apps/docs/app/page.tsx`

**Interfaces:**
- Produces: `QS_SNIPPETS` — `{ validators: { install: string, code: string }, react: { install: string, code: string } }`
- Produces: `QsCodeBlock({ code: string })` — renders code string line-by-line; comment lines (`//`) are dimmed to `#4C4C4C`, all others `#FAFAF9`
- Consumes: `qsTab` state typed as `"validators" | "react"`, `qsCopied` state typed as `boolean`, `copyQs` function

- [ ] **Step 1: Add `QS_SNIPPETS` constant and `QsCodeBlock` component to `page.tsx`**

Add these after the `Terminal` component function and before `export default function Page()`:

```tsx
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
          {line || " "}
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Add state and `copyQs` function inside `Page()`**

Inside `export default function Page()`, after the existing `const [copied, setCopied] = React.useState(false);` line, add:

```tsx
  const [qsTab, setQsTab] = React.useState<"validators" | "react">("validators");
  const [qsCopied, setQsCopied] = React.useState(false);

  const copyQs = () => {
    const { install, code } = QS_SNIPPETS[qsTab];
    navigator.clipboard.writeText(`${install}\n\n${code}`);
    setQsCopied(true);
    setTimeout(() => setQsCopied(false), 1500);
  };
```

- [ ] **Step 3: Insert Quick Start section JSX**

In the JSX return, find the closing `</section>` tag of the Hero section (the one that ends `{/* Hero — dark */}`). Insert the following block immediately after it and before the Validators section:

```tsx
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
```

- [ ] **Step 4: Visually verify Quick Start section**

With dev server running at `http://localhost:3000`:
- Scroll below the hero — "QUICK START" label and "From install to working in 60 seconds" heading appear
- Default tab is `@bharat-ui/validators` — install row shows `$ npm install @bharat-ui/validators`
- Click `@bharat-ui/react` tab — install command and code switch to the react snippet
- Click "Copy" — button turns green and shows "Copied!" for ~1.5 seconds
- Paste into a text editor — confirms clipboard contains `npm install @bharat-ui/react\n\n[react code snippet]`

- [ ] **Step 5: Commit**

```bash
git add apps/docs/app/page.tsx
git commit -m "feat(docs): add Quick Start section with tabbed code block"
```

---

### Task 4: Section IDs and CTA docs link

**Files:**
- Modify: `apps/docs/app/page.tsx`

**Interfaces:**
- No new interfaces — localized markup additions only
- Consumes: `Link` from `next/link` (already imported in Task 1)

- [ ] **Step 1: Add `id="validators"` to the Validators section**

Find the opening tag of the Validators section. It is the `<section` immediately after the Quick Start `</section>` and contains `@bharat-ui/validators` as its label text. Change:

```tsx
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
```

To:

```tsx
      <section
        id="validators"
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
```

- [ ] **Step 2: Add `id="components"` to the Components section**

Find the `<section` with `background: "#FAFAF9"` (the light section). Change:

```tsx
      <section
        style={{
          background: "#FAFAF9",
          padding: "72px 32px",
          borderBottom: "0.5px solid #E7E5E4",
        }}
      >
```

To:

```tsx
      <section
        id="components"
        style={{
          background: "#FAFAF9",
          padding: "72px 32px",
          borderBottom: "0.5px solid #E7E5E4",
        }}
      >
```

- [ ] **Step 3: Add `id="why"` to the Why section**

Find the `<section` whose label text is "Why Bharat UI". Change:

```tsx
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
```

To:

```tsx
      <section
        id="why"
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
```

- [ ] **Step 4: Add "Read the docs →" link in CTA section**

In the CTA section, find the closing `</div>` that closes the install command block (the `<div>` with `background: "#0A0A0A"` containing the `<code>npm install @bharat-ui/validators</code>`). Change:

```tsx
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
```

To:

```tsx
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
          <div style={{ marginTop: 20 }}>
            <Link
              href="/docs"
              style={{
                fontSize: 14,
                color: "#78350F",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              Read the docs →
            </Link>
          </div>
        </div>
      </section>
```

- [ ] **Step 5: Final visual check**

With dev server running at `http://localhost:3000`:
- Scroll to the saffron CTA section — "Read the docs →" link appears below the install block in dark brown (`#78350F`)
- Click "Read the docs →" — navigates to `/docs` stub page
- Scroll through all sections confirming existing content (validators grid, components demos, why grid) still render correctly

- [ ] **Step 6: Final build check**

```bash
cd /Users/ayushsanj/Documents/bharat-ui && bun run build --filter=docs 2>&1 | tail -20
```

Expected: exits 0, no TypeScript or build errors.

- [ ] **Step 7: Commit**

```bash
git add apps/docs/app/page.tsx
git commit -m "feat(docs): add section IDs and Read the docs link in CTA"
```
