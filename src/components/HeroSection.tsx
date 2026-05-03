"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight, Bot } from "lucide-react";
import { Github, Linkedin } from "@/components/Icons";
import { SOCIALS } from "@/lib/constants";
import dynamic from "next/dynamic";

const ProfileSphere = dynamic(() => import("@/components/ProfileSphere"), { ssr: false });


const ROLES = ["Full-Stack Developer", "Backend Enthusiast", "Open Source Contributor", "CS @ VIT Bhopal"];
const TECH_PILLS = ["React", "Next.js", "TypeScript", "Node.js", "Express.js", "AWS"];

function useTypewriter(words: string[], speed = 65, pause = 1800) {
  const [text, setText] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    const s = deleting ? 35 : speed;
    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting && charIdx <= current.length) {
      timeout = setTimeout(() => {
        setText(current.slice(0, charIdx));
        setCharIdx(charIdx + 1);
        if (charIdx === current.length) setTimeout(() => setDeleting(true), pause);
      }, s);
    } else if (deleting && charIdx >= 0) {
      timeout = setTimeout(() => {
        setText(current.slice(0, charIdx));
        setCharIdx(charIdx - 1);
        if (charIdx === 0) { setDeleting(false); setWordIdx((wordIdx + 1) % words.length); }
      }, s);
    }
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return text;
}

export default function HeroSection() {
  const role = useTypewriter(ROLES);

  const fade = (i: number) => ({
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.55, ease: "easeOut" as const } },
  });

  return (
    <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", paddingTop: "80px" }}>
      <div className="container-main" style={{ position: "relative", zIndex: 3, width: "100%" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "center" }} className="hero-grid">
          {/* LEFT */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.6rem" }}>
            <motion.div variants={fade(0)} initial="hidden" animate="visible">
              <span className="section-label">Available for opportunities</span>
            </motion.div>

            <motion.h1 variants={fade(1)} initial="hidden" animate="visible"
              style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.03em" }}>
              Aman Patre
            </motion.h1>

            <motion.div variants={fade(2)} initial="hidden" animate="visible"
              style={{ fontSize: "clamp(1rem, 1.8vw, 1.2rem)", fontWeight: 500, color: "var(--text-muted)", minHeight: "1.8em" }}>
              {role}
              <span style={{ display: "inline-block", width: "2px", height: "1em", background: "var(--accent)", marginLeft: "3px", verticalAlign: "middle", animation: "blink 0.9s step-end infinite" }} />
            </motion.div>

            <motion.p variants={fade(3)} initial="hidden" animate="visible"
              style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: 1.85, maxWidth: "460px" }}>
              Building robust systems at the intersection of{" "}
              <span style={{ color: "var(--text)", fontWeight: 500 }}>scalable backends</span> and{" "}
              <span style={{ color: "var(--text)", fontWeight: 500 }}>AI-driven applications</span>.
            </motion.p>

            <motion.div variants={fade(4)} initial="hidden" animate="visible"
              style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>
              {TECH_PILLS.map((pill) => <span key={pill} className="tech-pill">{pill}</span>)}
            </motion.div>

            <motion.div variants={fade(5)} initial="hidden" animate="visible"
              style={{ display: "flex", gap: "0.85rem", flexWrap: "wrap" }}>
              <Link href="/node"
                style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.7rem 1.4rem", background: "var(--accent)", color: "#04080f", fontWeight: 700, fontSize: "0.85rem", textDecoration: "none", borderRadius: "8px", transition: "all 0.2s ease" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.03)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 24px rgba(0,210,255,0.35)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}>
                <Bot size={15} /> Chat with NODE
              </Link>
              <Link href="/projects"
                style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.7rem 1.4rem", background: "transparent", color: "var(--text)", fontWeight: 500, fontSize: "0.85rem", border: "1px solid var(--border)", textDecoration: "none", borderRadius: "8px", transition: "all 0.2s ease" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,210,255,0.4)"; (e.currentTarget as HTMLElement).style.color = "var(--accent)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.color = "var(--text)"; }}>
                <ArrowRight size={15} /> View Projects
              </Link>
            </motion.div>

            <motion.div variants={fade(6)} initial="hidden" animate="visible"
              style={{ display: "flex", gap: "1.25rem", alignItems: "center" }}>
              {[
                { icon: <Github size={16} />, label: "AmanPatre", href: SOCIALS.github },
                { icon: <Linkedin size={16} />, label: "aman-patre", href: SOCIALS.linkedin },
                { icon: <Mail size={16} />, label: "Email", href: `mailto:${SOCIALS.email}` },
              ].map(({ icon, label, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.78rem", color: "var(--text-muted)", textDecoration: "none", transition: "color 0.2s ease" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--accent)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")}>
                  {icon}{label}
                </a>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — Astronaut Helmet */}
          <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.3 }}
            style={{ display: "flex", justifyContent: "center", alignItems: "center" }} className="helmet-wrapper">
            <ProfileSphere photoSrc="/aman.jpg" photoAlt="Aman Patre" />
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 992px) {
          .hero-grid { grid-template-columns: 1fr !important; text-align: center; }
          .hero-grid > div:first-child { align-items: center; }
          .helmet-wrapper { margin-top: 2rem; }
        }
      `}</style>
    </section>
  );
}
