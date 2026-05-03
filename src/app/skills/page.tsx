"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { SKILLS } from "@/lib/constants";
import dynamic from "next/dynamic";

const Globe3D = dynamic(() => import("@/components/Globe3D"), { ssr: false });

export default function ForgePage() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div style={{ paddingTop: "100px", paddingBottom: "4rem", position: "relative", zIndex: 10 }}>
      <div className="container-main">
        <div style={{ marginBottom: "3rem" }}>
          <span className="section-label">Skills</span>
          <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, marginBottom: "0.75rem" }}>Tech Stack</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", maxWidth: "480px", lineHeight: 1.7 }}>
            Tools, languages, and frameworks in my arsenal. Hover any skill to see proficiency.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }} className="forge-main-grid">
          {/* TOP — Globe */}
          <div style={{ height: "400px", position: "relative", width: "100%" }} className="globe-wrapper">
            <Globe3D />
          </div>

          {/* BOTTOM — Skills */}
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }} className="skills-grid">
          {SKILLS.map((cat, ci) => (
            <motion.div key={cat.label}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: ci * 0.1 }}
              style={{ padding: "1.5rem", background: "rgba(12,16,24,0.8)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", border: "1px solid var(--border)", borderLeft: "2px solid var(--accent)", borderRadius: "8px" }}>
              <div style={{ marginBottom: "1.25rem" }}>
                <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{cat.label}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem" }}>
                {cat.skills.map((skill) => {
                  const key = `${cat.label}-${skill.name}`;
                  const isHov = hovered === key;
                  return (
                    <div key={skill.name} onMouseEnter={() => setHovered(key)} onMouseLeave={() => setHovered(null)}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: isHov ? "0.35rem" : "0" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: isHov ? "var(--accent)" : "var(--border)", display: "inline-block", transition: "background 0.2s", flexShrink: 0 }} />
                          <span style={{ fontSize: "0.82rem", color: isHov ? "var(--text)" : "var(--text-muted)", transition: "color 0.2s" }}>{skill.name}</span>
                        </div>
                        {isHov && <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--accent)" }}>{skill.proficiency}%</span>}
                      </div>
                      {isHov && (
                        <div style={{ height: "2px", background: "rgba(0,210,255,0.1)", borderRadius: "1px", overflow: "hidden", marginLeft: "0.85rem" }}>
                          <motion.div initial={{ width: 0 }} animate={{ width: `${skill.proficiency}%` }} transition={{ duration: 0.4, ease: "easeOut" }}
                            style={{ height: "100%", background: "var(--accent)", boxShadow: "0 0 6px var(--accent)" }} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              </motion.div>
            ))}
            </div>
            
            <div style={{ marginTop: "2rem", textAlign: "center" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--text-muted)" }}>
                {SKILLS.reduce((a, c) => a + c.skills.length, 0)} skills across {SKILLS.length} categories
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
