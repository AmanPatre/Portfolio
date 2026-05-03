"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import type { Credential } from "@/lib/types";
import { formatDate } from "@/lib/utils";

const CATEGORY_COLORS: Record<string, string> = {
  certificate: "var(--accent)",
  course: "#60a5fa",
  hackathon: "#f59e0b",
  recognition: "#a78bfa",
};

export default function CredentialCard({ cred, index }: { cred: Credential; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        onClick={() => setOpen(true)}
        style={{
          background: "rgba(12,16,24,0.8)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid var(--border)",
          borderLeft: `2px solid ${CATEGORY_COLORS[cred.category]}`,
          borderRadius: "8px",
          padding: "1.25rem",
          cursor: "pointer",
          transition: "all 0.2s ease",
          position: "relative",
          overflow: "hidden",
        }}
        whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.3)" }}
      >
        <div style={{ position: "absolute", top: "0.75rem", right: "0.75rem", color: "var(--text-muted)", opacity: 0.4 }}>
          <ZoomIn size={14} />
        </div>

        {/* Image placeholder */}
        <div style={{ width: "100%", height: "120px", background: "rgba(0,210,255,0.04)", border: "1px solid var(--border)", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
          {cred.image
            // eslint-disable-next-line @next/next/no-img-element
            ? <img src={cred.image} alt={cred.title} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "4px" }} />
            : <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--text-muted)", opacity: 0.4 }}>[certificate preview]</span>
          }
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: CATEGORY_COLORS[cred.category], textTransform: "uppercase", letterSpacing: "0.1em" }}>
            {cred.category}
          </span>
          <h3 style={{ fontSize: "0.92rem", fontWeight: 600, lineHeight: 1.4 }}>{cred.title}</h3>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--text-muted)" }}>{cred.issuer}</p>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--text-muted)", opacity: 0.6 }}>{formatDate(cred.date)}</p>
        </div>
      </motion.div>

      {/* Modal */}
      {open && (
        <div onClick={() => setOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 500, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <motion.div initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} onClick={(e) => e.stopPropagation()}
            style={{ background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: "8px", padding: "2rem", maxWidth: "500px", width: "90vw", position: "relative" }}>
            <button onClick={() => setOpen(false)} style={{ position: "absolute", top: "1rem", right: "1rem", background: "transparent", border: "none", color: "var(--text-muted)", cursor: "pointer" }}>
              <X size={18} />
            </button>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.5rem" }}>{cred.title}</h3>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--accent2)", marginBottom: "0.25rem" }}>{cred.issuer}</p>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--text-muted)" }}>{formatDate(cred.date)}</p>
            {cred.link && (
              <a href={cred.link} target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-block", marginTop: "1rem", fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--accent)", textDecoration: "none" }}>
                [view credential →]
              </a>
            )}
          </motion.div>
        </div>
      )}
    </>
  );
}
