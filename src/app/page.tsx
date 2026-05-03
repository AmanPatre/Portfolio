"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import ProjectCard from "@/components/ProjectCard";
import EnquirySection from "@/components/EnquirySection";
import { PROJECTS, EXPERIENCE } from "@/lib/constants";

export default function HomePage() {
  const featured = PROJECTS.filter((p) => p.featured);

  const fade = (i: number) => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.45, delay: i * 0.08 },
  });

  return (
    <>
      {/* HERO */}
      <HeroSection />

      {/* FEATURED PROJECTS */}
      <section className="section-pad" style={{ position: "relative", zIndex: 10 }}>
        <div className="container-main">
          <div style={{ marginBottom: "2.5rem", display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <span className="section-label">Work</span>
              <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 800 }}> Projects</h2>
            </div>
            <Link href="/projects"
              style={{ fontSize: "0.82rem", fontWeight: 500, color: "var(--text-muted)", textDecoration: "none", display: "flex", alignItems: "center", gap: "0.35rem", transition: "color 0.2s" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--accent)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")}>
              View all →
            </Link>
          </div>
          <div className="projects-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.25rem" }}>
            {featured.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
          </div>
        </div>
      </section>

      {/* ABOUT SNAPSHOT */}
      <section className="section-pad" style={{ position: "relative", zIndex: 10 }}>
        <div className="container-main">
          <div style={{ marginBottom: "2.5rem" }}>
            <span className="section-label">About</span>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 800 }}>Who I Am</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "start" }} className="about-snap-grid">
            <motion.div {...fade(0)} style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
              <p style={{ color: "var(--text-muted)", lineHeight: 1.85, fontSize: "0.95rem" }}>
                I&apos;m Aman — a CS student at{" "}
                <span style={{ color: "var(--text)", fontWeight: 600 }}>VIT Bhopal</span>, building scalable backend systems and AI-driven products. I care deeply about clean
                architecture, meaningful products, and solving real-world problems.
              </p>
              <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
                {[{ label: "5+", desc: "Projects" }, { label: "2027", desc: "Grad Year" }, { label: "VIT", desc: "Bhopal" }].map(({ label, desc }) => (
                  <div key={label}>
                    <span style={{ fontSize: "2rem", fontWeight: 800, color: "var(--accent)", lineHeight: 1, display: "block", letterSpacing: "-0.03em" }}>{label}</span>
                    <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{desc}</span>
                  </div>
                ))}
              </div>
              <Link href="/about"
                style={{ fontSize: "0.82rem", fontWeight: 500, color: "var(--accent)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.3rem" }}>
                Read more →
              </Link>
            </motion.div>

            <motion.div {...fade(1)} style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {[
                { key: "Growth", desc: "Always learning and adapting to new technologies" },
                { key: "Consistency", desc: "Writing clean, scalable code day in and day out" },
                { key: "Impact", desc: "Building solutions that solve real-world problems" },
              ].map(({ key, desc }) => (
                <div key={key}
                  style={{ padding: "1.1rem 1.25rem", background: "rgba(12,16,24,0.8)", backdropFilter: "blur(12px)", border: "1px solid var(--border)", borderLeft: "2px solid var(--accent)", borderRadius: "8px" }}>
                  <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--accent)", display: "block", marginBottom: "0.3rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>{key}</span>
                  <span style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>{desc}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="section-pad" style={{ position: "relative", zIndex: 10 }}>
        <div className="container-main">
          <div style={{ marginBottom: "2.5rem" }}>
            <span className="section-label">Experience</span>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 800 }}>Background</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
            {EXPERIENCE.map((exp, i) => (
              <motion.div key={exp.id} {...fade(i)}
                style={{ padding: "1.5rem 1.75rem", background: "rgba(12,16,24,0.8)", backdropFilter: "blur(16px)", border: "1px solid var(--border)", borderLeft: "2px solid var(--accent)", borderRadius: "10px" }}>
                <div className="exp-meta" style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.85rem" }}>
                  <div>
                    <h3 style={{ fontSize: "1rem", fontWeight: 700, letterSpacing: "-0.01em" }}>{exp.role}</h3>
                    <span style={{ fontSize: "0.82rem", fontWeight: 500, color: "var(--accent2)" }}>{exp.company}</span>
                  </div>
                  <div className="exp-meta-right" style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.25rem" }}>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--text-muted)" }}>{exp.duration}</span>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", padding: "0.1rem 0.5rem", border: "1px solid var(--border)", borderRadius: "4px", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{exp.type}</span>
                  </div>
                </div>
                <ul style={{ paddingLeft: 0 }}>
                  {exp.description.map((d, j) => (
                    <li key={j} style={{ fontSize: "0.875rem", color: "var(--text-muted)", listStyle: "none", paddingLeft: "1rem", position: "relative", lineHeight: 1.75 }}>
                      <span style={{ position: "absolute", left: 0, color: "var(--accent2)" }}>·</span>{d}
                    </li>
                  ))}
                </ul>
                {exp.stack && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "0.85rem" }}>
                    {exp.stack.map((s) => <span key={s} className="tech-pill">{s}</span>)}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <EnquirySection />

    </>
  );
}
