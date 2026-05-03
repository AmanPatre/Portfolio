"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { NAV_LINKS } from "@/lib/constants";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const renderLink = (link: typeof NAV_LINKS[0]) => {
    const isActive =
      link.href === "/"
        ? pathname === "/"
        : pathname.startsWith(link.href);
    return (
      <Link
        key={link.href}
        href={link.href}
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "0.82rem",
          fontWeight: link.terminalPath === "node" ? 600 : 500,
          padding: "0.35rem 0.85rem",
          color: link.terminalPath === "node"
            ? (isActive ? "#04080f" : "var(--accent)")
            : (isActive ? "var(--accent)" : "var(--text-muted)"),
          textDecoration: "none",
          borderRadius: "6px",
          background: link.terminalPath === "node"
            ? (isActive ? "var(--accent)" : "rgba(0,210,255,0.08)")
            : (isActive ? "rgba(0,210,255,0.07)" : "transparent"),
          border: link.terminalPath === "node" 
            ? "1px solid rgba(0,210,255,0.2)" 
            : "1px solid transparent",
          transition: "all 0.2s ease",
        }}
        onMouseEnter={(e) => {
          if (link.terminalPath === "node") {
            (e.target as HTMLElement).style.background = "var(--accent)";
            (e.target as HTMLElement).style.color = "#04080f";
          } else if (!isActive) {
            (e.target as HTMLElement).style.color = "var(--text)";
          }
        }}
        onMouseLeave={(e) => {
          if (link.terminalPath === "node") {
            (e.target as HTMLElement).style.background = isActive ? "var(--accent)" : "rgba(0,210,255,0.08)";
            (e.target as HTMLElement).style.color = isActive ? "#04080f" : "var(--accent)";
          } else if (!isActive) {
            (e.target as HTMLElement).style.color = "var(--text-muted)";
          }
        }}
      >
        {link.terminalPath.charAt(0).toUpperCase() + link.terminalPath.slice(1)}
      </Link>
    );
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: scrolled
          ? "rgba(5, 10, 6, 0.92)"
          : "rgba(5, 10, 6, 0.6)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: scrolled
          ? "1px solid rgba(0,210,255,0.1)"
          : "1px solid transparent",
        transition: "all 0.3s ease",
      }}
    >
      <div
        className="container-main"
        style={{
          display: "flex",
          alignItems: "center",
          height: "56px",
        }}
      >
        {/* Left: Logo */}
        <div style={{ flex: 1, display: "flex", justifyContent: "flex-start" }}>
          <Link
            href="/"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1rem",
              fontWeight: 700,
              color: "var(--text)",
              textDecoration: "none",
              letterSpacing: "-0.02em",
            }}
          >
            <span style={{ color: "var(--text)", fontWeight: 800, fontSize: "1.1rem", letterSpacing: "-0.03em" }}>AmanPatre</span>
          </Link>
        </div>

        {/* Center: Main Links */}
        <div
          className="flex flex-wrap"
          style={{ flex: 2, gap: "0.25rem", justifyContent: "center", alignItems: "center" }}
        >
          {NAV_LINKS.filter((link) => link.terminalPath !== "node").map((link) => renderLink(link))}
        </div>

        {/* Right: Node Button */}
        <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
          {NAV_LINKS.filter((link) => link.terminalPath === "node").map((link) => renderLink(link))}
        </div>

      </div>
    </nav>
  );
}
