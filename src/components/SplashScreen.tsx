"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setVisible(false);
            onComplete();
          }, 400);
          return 100;
        }
        return prev + 2;
      });
    }, 20);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: "#04080f" }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* Skip */}
          <button
            onClick={() => { setVisible(false); onComplete(); }}
            style={{
              position: "fixed", bottom: "2rem", right: "2rem",
              fontSize: "0.75rem", color: "var(--text-muted)",
              background: "transparent", border: "1px solid var(--border)",
              padding: "0.35rem 0.85rem", borderRadius: "6px", cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--text-muted)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}
          >
            Skip
          </button>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem", width: "100%", maxWidth: "340px", padding: "0 1.5rem" }}>
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{ textAlign: "center" }}
            >
              <div style={{ fontSize: "2.5rem", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--text)" }}>
                AmanPatre<span style={{ color: "var(--accent)" }}>.</span>
              </div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "0.4rem", fontWeight: 400 }}>
                Loading portfolio
              </div>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              style={{ width: "100%" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--text-muted)" }}>
                  Initializing
                </span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--accent)" }}>
                  {progress}%
                </span>
              </div>
              <div style={{ height: "2px", background: "rgba(255,255,255,0.06)", borderRadius: "2px", overflow: "hidden" }}>
                <div style={{
                  height: "100%",
                  width: `${progress}%`,
                  background: "var(--accent)",
                  borderRadius: "2px",
                  transition: "width 0.05s linear",
                  boxShadow: "0 0 8px rgba(0,210,255,0.4)",
                }} />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
