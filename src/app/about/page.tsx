import { EXPERIENCE } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Aman Patre",
  description: "Bio, education, and internship experience of Aman Patre.",
};

export default function AboutPage() {
  return (
    <div style={{ paddingTop: "100px", paddingBottom: "4rem", position: "relative", zIndex: 10 }}>
      <div className="container-main">
        <div style={{ marginBottom: "3rem" }}>
          <span className="section-label">About</span>
          <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800 }}>About Me</h1>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "start" }} className="about-page-grid">
          {/* LEFT */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            <p style={{ color: "var(--text-muted)", lineHeight: 1.9, fontSize: "0.95rem" }}>
              I&apos;m Aman — a CS student at <span style={{ color: "var(--text)" }}>VIT Bhopal</span>, building at the intersection of scalable backend systems and AI-driven products. I care deeply about clean architecture, meaningful products, and solving real-world problems.{" "}
              <span style={{ color: "var(--accent2)", fontStyle: "italic" }}>Driven by growth and consistency.</span>
            </p>

            {/* Trait blocks */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {[
                { key: "Growth", desc: "Always learning and adapting to new technologies" },
                { key: "Consistency", desc: "Writing clean, scalable code day in and day out" },
                { key: "Impact", desc: "Building solutions that solve real-world problems" },
              ].map(({ key, desc }) => (
                <div key={key} style={{ padding: "1rem 1.25rem", background: "rgba(12,16,24,0.8)", backdropFilter: "blur(12px)", border: "1px solid var(--border)", borderLeft: "2px solid var(--accent)", borderRadius: "8px" }}>
                  <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--accent)", display: "block", marginBottom: "0.3rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>{key}</span>
                  <span style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>{desc}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", padding: "1.25rem", background: "rgba(0,210,255,0.03)", border: "1px solid rgba(0,210,255,0.1)", borderRadius: "6px" }}>
              {[
                { label: "Projects", value: "5+" },
                { label: "University", value: "VIT Bhopal" },
                { label: "Grad", value: "2027" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--accent)", lineHeight: 1 }}>{value}</div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "0.2rem" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {/* Education */}
            <div style={{ padding: "1.5rem", background: "rgba(12,16,24,0.8)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", border: "1px solid var(--border)", borderLeft: "2px solid var(--accent)", borderRadius: "8px" }}>
              <span style={{ fontSize: "0.68rem", fontWeight: 700, color: "var(--accent2)", textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: "0.75rem" }}>Education</span>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.25rem" }}>VIT Bhopal University</h3>
              <p style={{ fontSize: "0.82rem", color: "var(--accent2)", marginBottom: "0.4rem" }}>B.Tech Computer Science and Engineering</p>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--text-muted)" }}>2023 → 2027</p>
            </div>

            {/* Internship */}
            <div style={{ padding: "1.5rem", background: "rgba(12,16,24,0.8)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", border: "1px solid var(--border)", borderLeft: "2px solid var(--accent)", borderRadius: "8px" }}>
              <span style={{ fontSize: "0.68rem", fontWeight: 700, color: "var(--accent2)", textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: "0.75rem" }}>Internship</span>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.25rem" }}>Backend Intern</h3>
              <p style={{ fontSize: "0.82rem", color: "var(--accent2)", marginBottom: "0.4rem" }}>PearlThoughts</p>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "var(--text-muted)", marginBottom: "0.85rem" }}>Nov 2025 — Jan 2026</p>
              <ul style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                {["Built scalable serverless REST APIs", "Optimized SQL DB with Sequelize ORM", "Refactored appointment editing & IVR flows", "Ensured seamless data consistency"].map((item) => (
                  <li key={item} style={{ fontSize: "0.82rem", color: "var(--text-muted)", listStyle: "none", paddingLeft: "1rem", position: "relative" }}>
                    <span style={{ position: "absolute", left: 0, color: "var(--accent2)" }}>·</span>{item}
                  </li>
                ))}
              </ul>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "0.85rem" }}>
                {["Node.js", "Express", "TypeScript", "Sequelize", "SQL"].map((s) => <span key={s} className="tech-pill">{s}</span>)}
              </div>
            </div>

            {/* Location */}
            <div style={{ padding: "1.25rem", background: "rgba(12,16,24,0.8)", backdropFilter: "blur(16px)", border: "1px solid var(--border)", borderRadius: "6px" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: "0.5rem" }}>Location</span>
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <span style={{ fontSize: "1.2rem" }}>🇮🇳</span>
                <div>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem", color: "var(--text)" }}>INDIA</p>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--text-muted)" }}>23.1237° N, 79.9241° E · GMT+5:30</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
