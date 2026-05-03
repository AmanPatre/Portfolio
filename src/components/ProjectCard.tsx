"use client";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Github } from "@/components/Icons";
import type { Project } from "@/lib/types";

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const isComing = project.status === "coming_soon";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      style={{
        position: "relative",
        background: "rgba(10,15,11,0.8)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: isComing ? "1px solid rgba(0,210,255,0.12)" : "1px solid var(--border)",
        borderLeft: isComing ? "3px solid rgba(0,210,255,0.15)" : "3px solid var(--accent)",
        borderRadius: "6px",
        padding: "1.5rem",
        transition: "all 0.2s ease",
        cursor: isComing ? "default" : "pointer",
        animation: isComing ? "pulseBorder 2s ease-in-out infinite" : "none",
        overflow: "hidden",
      }}
      whileHover={!isComing ? { y: -6 } : {}}
      onMouseEnter={(e) => {
        if (!isComing) {
          (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(0,0,0,0.4), -4px 0 12px rgba(0,210,255,0.15)";
          (e.currentTarget as HTMLElement).style.borderLeftColor = "var(--accent)";
        }
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      {/* Project number */}
      <span style={{ position: "absolute", top: "1rem", right: "1rem", fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--text-muted)", opacity: 0.4 }}>
        {String(index + 1).padStart(2, "0")}
      </span>

      {isComing ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", minHeight: "120px", justifyContent: "center" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", color: "rgba(0,210,255,0.3)" }}>// coming_soon</span>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            {[1, 2, 3].map((i) => (
              <span key={i} style={{ width: "24px", height: "4px", background: "rgba(0,210,255,0.15)", borderRadius: "2px", display: "block" }} />
            ))}
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
          {/* Header row */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem" }}>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text)", lineHeight: 1.3 }}>{project.title}</h3>
            <div style={{ display: "flex", gap: "0.4rem", flexShrink: 0, marginTop: "2px" }}>
              {project.status === "live" && <span className="badge-live">LIVE</span>}
              {project.status === "wip" && <span className="badge-wip">WIP</span>}
              {project.status === "oss" && <span className="badge-oss">OSS</span>}
            </div>
          </div>

          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.7 }}>{project.description}</p>

          {/* Stack pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
            {project.stack.map((s) => <span key={s} className="tech-pill">{s}</span>)}
          </div>

          {/* Links */}
          <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.25rem" }}>
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "var(--text-muted)", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--accent)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")}>
                <Github size={13} /> github
              </a>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "var(--text-muted)", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--accent)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")}>
                <ExternalLink size={13} /> live
              </a>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}
