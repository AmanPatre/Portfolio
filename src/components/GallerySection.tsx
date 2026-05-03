"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface Image { src: string; alt: string; }

export default function GallerySection({ images }: { images: Image[] }) {
  const [selected, setSelected] = useState<number | null>(null);

  const placeholders = images.length === 0
    ? Array.from({ length: 8 }, (_, i) => ({ src: "", alt: `Photo ${i + 1}` }))
    : images;

  return (
    <>
      <div className="gallery-masonry" style={{ columns: "3 200px", gap: "1rem" }}>
        {placeholders.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            onClick={() => img.src && setSelected(i)}
            style={{
              breakInside: "avoid",
              marginBottom: "1rem",
              borderRadius: "6px",
              overflow: "hidden",
              cursor: img.src ? "pointer" : "default",
              border: "1px solid var(--border)",
              background: "rgba(10,15,11,0.8)",
              aspectRatio: i % 3 === 0 ? "4/3" : i % 3 === 1 ? "3/4" : "1/1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s ease",
            }}
            whileHover={{ scale: 1.02 }}
          >
            {img.src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={img.src} alt={img.alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", padding: "2rem" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--text-muted)", opacity: 0.4 }}>
                  [{String(i + 1).padStart(2, "0")}]
                </span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--text-muted)", opacity: 0.3 }}>no image yet</span>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.9)", zIndex: 500, display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <button onClick={() => setSelected(null)} style={{ position: "absolute", top: "1.5rem", right: "1.5rem", background: "transparent", border: "1px solid var(--border)", color: "var(--text-muted)", padding: "0.5rem", borderRadius: "4px", cursor: "pointer" }}>
              <X size={18} />
            </button>
            <button onClick={(e) => { e.stopPropagation(); setSelected(Math.max(0, selected - 1)); }}
              style={{ position: "absolute", left: "1.5rem", background: "transparent", border: "1px solid var(--border)", color: "var(--text-muted)", padding: "0.5rem", borderRadius: "4px", cursor: "pointer" }}>
              <ChevronLeft size={18} />
            </button>
            <motion.div initial={{ scale: 0.85 }} animate={{ scale: 1 }} onClick={(e) => e.stopPropagation()}
              style={{ maxWidth: "80vw", maxHeight: "80vh", borderRadius: "8px", overflow: "hidden", border: "1px solid var(--border)" }}>
              {placeholders[selected]?.src
                ? <img src={placeholders[selected].src} alt={placeholders[selected].alt} style={{ maxWidth: "80vw", maxHeight: "80vh", objectFit: "contain" }} />
                : <div style={{ width: "400px", height: "300px", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg2)", color: "var(--text-muted)", fontFamily: "var(--font-mono)", fontSize: "0.8rem" }}>no image</div>
              }
            </motion.div>
            <button onClick={(e) => { e.stopPropagation(); setSelected(Math.min(placeholders.length - 1, selected + 1)); }}
              style={{ position: "absolute", right: "1.5rem", background: "transparent", border: "1px solid var(--border)", color: "var(--text-muted)", padding: "0.5rem", borderRadius: "4px", cursor: "pointer" }}>
              <ChevronRight size={18} />
            </button>
            <div style={{ position: "absolute", bottom: "1.5rem", fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--text-muted)" }}>
              {selected + 1} / {placeholders.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
