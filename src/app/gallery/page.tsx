import GallerySection from "@/components/GallerySection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery — Aman Patre",
  description: "Photo gallery from Aman Patre's journey.",
};

export default function GalleryPage() {
  return (
    <div style={{ paddingTop: "100px", paddingBottom: "4rem", position: "relative", zIndex: 10 }}>
      <div className="container-main">
        <div style={{ marginBottom: "3rem" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--text-muted)", display: "block", marginBottom: "0.5rem" }}>
            &gt; ls ./gallery --visual
          </span>
          <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, marginBottom: "0.75rem" }}>Gallery</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", maxWidth: "480px", lineHeight: 1.7 }}>
            Moments, memories, and places. Click any image to expand.
          </p>
        </div>
        <GallerySection images={[]} />
      </div>
    </div>
  );
}
