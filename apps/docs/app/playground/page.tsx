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
