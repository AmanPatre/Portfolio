"use client";
import Link from "next/link";
import { Mail, Activity, Image as ImageIcon, Bot } from "lucide-react";
import { Github, Linkedin } from "@/components/Icons";
import { SOCIALS } from "@/lib/constants";

export default function Footer() {
  const year = new Date().getFullYear();

  const linkStyle = {
    display: "flex",
    alignItems: "center",
    gap: "0.4rem",
    fontSize: "0.8rem",
    color: "var(--text-muted)" as const,
    textDecoration: "none" as const,
    fontWeight: 400,
    transition: "color 0.2s ease",
  };

  const iconLinkStyle = {
    color: "var(--text-muted)" as const,
    transition: "color 0.2s ease",
    display: "flex" as const,
  };

  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        background: "rgba(6,10,15,0.9)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        position: "relative",
        zIndex: 10,
      }}
    >
      <div className="container-main" style={{ padding: "2rem 1.5rem" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1.5rem",
          }}
        >
          {/* Left: branding + copyright */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
            <span style={{ fontSize: "0.9rem", fontWeight: 700, letterSpacing: "-0.02em", color: "var(--text)" }}>
              AmanPatre<span style={{ color: "var(--accent)" }}>.</span>
            </span>
            <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
              © {year} Aman Patre · All rights reserved
            </span>
          </div>

          {/* Center: quick links */}
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <Link href="/gallery" style={linkStyle}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")}>
              <ImageIcon size={13} /> Gallery
            </Link>
            <Link href="/spectrum" style={linkStyle}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")}>
              <Activity size={13} /> Monitor
            </Link>
            <Link href="/node" style={linkStyle}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")}>
              <Bot size={13} /> NODE
            </Link>
          </div>

          {/* Right: social links */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
            <a href={SOCIALS.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
              style={iconLinkStyle}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--accent)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")}>
              <Github size={17} />
            </a>
            <a href={SOCIALS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
              style={iconLinkStyle}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--accent)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")}>
              <Linkedin size={17} />
            </a>
            <a href={`mailto:${SOCIALS.email}`} aria-label="Email"
              style={iconLinkStyle}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--accent)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")}>
              <Mail size={17} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
