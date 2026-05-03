"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
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

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const renderDesktopLink = (link: typeof NAV_LINKS[0]) => {
    const active = isActive(link.href);
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
            ? (active ? "#04080f" : "var(--accent)")
            : (active ? "var(--accent)" : "var(--text-muted)"),
          textDecoration: "none",
          borderRadius: "6px",
          background: link.terminalPath === "node"
            ? (active ? "var(--accent)" : "rgba(0,210,255,0.08)")
            : (active ? "rgba(0,210,255,0.07)" : "transparent"),
          border: link.terminalPath === "node"
            ? "1px solid rgba(0,210,255,0.2)"
            : "1px solid transparent",
          transition: "all 0.2s ease",
        }}
        onMouseEnter={(e) => {
          if (link.terminalPath === "node") {
            (e.target as HTMLElement).style.background = "var(--accent)";
            (e.target as HTMLElement).style.color = "#04080f";
          } else if (!active) {
            (e.target as HTMLElement).style.color = "var(--text)";
          }
        }}
        onMouseLeave={(e) => {
          if (link.terminalPath === "node") {
            (e.target as HTMLElement).style.background = active ? "var(--accent)" : "rgba(0,210,255,0.08)";
            (e.target as HTMLElement).style.color = active ? "#04080f" : "var(--accent)";
          } else if (!active) {
            (e.target as HTMLElement).style.color = "var(--text-muted)";
          }
        }}
      >
        {link.terminalPath.charAt(0).toUpperCase() + link.terminalPath.slice(1)}
      </Link>
    );
  };

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: scrolled ? "rgba(5, 10, 6, 0.92)" : "rgba(5, 10, 6, 0.6)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: scrolled ? "1px solid rgba(0,210,255,0.1)" : "1px solid transparent",
          transition: "all 0.3s ease",
        }}
      >
        <div
          className="container-main nav-container"
          style={{ display: "flex", alignItems: "center", height: "56px" }}
        >
          {/* Logo */}
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
              <span style={{ color: "var(--text)", fontWeight: 800, fontSize: "1.1rem", letterSpacing: "-0.03em" }}>
                AmanPatre
              </span>
            </Link>
          </div>

          {/* Desktop Center Links */}
          <div className="nav-desktop-links" style={{ flex: 2, gap: "0.25rem", justifyContent: "center", alignItems: "center", display: "flex", flexWrap: "wrap" }}>
            {NAV_LINKS.filter((link) => link.terminalPath !== "node").map((link) => renderDesktopLink(link))}
          </div>

          {/* Desktop Right: Node Button */}
          <div className="nav-desktop-links" style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
            {NAV_LINKS.filter((link) => link.terminalPath === "node").map((link) => renderDesktopLink(link))}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            style={{
              background: "transparent",
              border: "1px solid rgba(0,210,255,0.2)",
              borderRadius: "6px",
              color: "var(--accent)",
              cursor: "pointer",
              padding: "0.4rem",
              display: "none",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s ease",
            }}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.6)",
                zIndex: 98,
                display: "none",
              }}
              className="nav-backdrop"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
              style={{
                position: "fixed",
                top: "56px",
                right: 0,
                bottom: 0,
                width: "min(260px, 75vw)",
                background: "rgba(7,13,26,0.98)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                borderLeft: "1px solid rgba(0,210,255,0.1)",
                zIndex: 99,
                padding: "2rem 1.25rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1rem",
              }}
              className="nav-drawer"
            >
              {NAV_LINKS.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "0.65rem",
                      padding: "0.75rem 1.5rem",
                      borderRadius: "8px",
                      textDecoration: "none",
                      width: "100%",
                      fontFamily: "var(--font-display)",
                      fontSize: "0.92rem",
                      fontWeight: link.terminalPath === "node" ? 700 : 500,
                      color: link.terminalPath === "node"
                        ? (active ? "#04080f" : "var(--accent)")
                        : (active ? "var(--accent)" : "var(--text-muted)"),
                      background: link.terminalPath === "node"
                        ? (active ? "var(--accent)" : "rgba(0,210,255,0.08)")
                        : (active ? "rgba(0,210,255,0.07)" : "transparent"),
                      border: active ? "1px solid rgba(0,210,255,0.2)" : "1px solid transparent",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <span style={{ fontSize: "0.75rem", fontFamily: "var(--font-mono)", color: active ? "var(--accent)" : "var(--text-muted)", opacity: 0.6 }}>
                      ~/
                    </span>
                    {link.terminalPath.charAt(0).toUpperCase() + link.terminalPath.slice(1)}
                  </Link>
                );
              })}

              <div style={{ marginTop: "auto", paddingTop: "1rem", borderTop: "1px solid var(--border)", width: "100%", textAlign: "center" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "var(--text-muted)" }}>
                  AmanPatre · Portfolio
                </span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop-links { display: none !important; }
          .nav-hamburger { display: flex !important; }
          .nav-backdrop { display: block !important; }
          .nav-container { height: 50px !important; }
        }
      `}</style>
    </>
  );
}
