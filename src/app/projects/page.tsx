import ProjectCard from "@/components/ProjectCard";
import { PROJECTS } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects — Aman Patre",
  description: "All projects by Aman Patre — full-stack and ML builds.",
};

export default function ProjectsPage() {
  return (
    <div style={{ paddingTop: "100px", paddingBottom: "4rem", position: "relative", zIndex: 10 }}>
      <div className="container-main">
        {/* Header */}
        <div style={{ marginBottom: "3rem" }}>

          <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, marginBottom: "0.75rem" }}>Projects</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", maxWidth: "480px", lineHeight: 1.7 }}>
            A collection of things I&apos;ve built — from real-time commodity platforms to ML research and AI-powered tools.
          </p>
        </div>

        {/* Stats bar */}
        <div className="stats-bar" style={{ display: "flex", gap: "2rem", marginBottom: "2.5rem", padding: "0.85rem 1.25rem", background: "rgba(0,210,255,0.03)", border: "1px solid rgba(0,210,255,0.1)", borderRadius: "6px", flexWrap: "wrap" }}>
          {[
            { label: "total", value: PROJECTS.length },
            { label: "live", value: PROJECTS.filter((p) => p.status === "live").length },
            { label: "open source", value: PROJECTS.filter((p) => p.status === "oss").length },
            { label: "in progress", value: PROJECTS.filter((p) => p.status === "coming_soon").length },
          ].map(({ label, value }) => (
            <div key={label} style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", fontWeight: 700, color: "var(--accent)" }}>{value}</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--text-muted)", textTransform: "uppercase" }}>{label}</span>
            </div>
          ))}
        </div>

        {/* Grid */}
        <div className="projects-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.25rem" }}>
          {PROJECTS.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
        </div>
      </div>
    </div>
  );
}
