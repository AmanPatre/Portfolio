"use client";

import React, { useState } from "react";
import { Download } from "lucide-react";

export default function ResumePage() {
  const [hasError, setHasError] = useState(false);

  return (
    <div style={{ paddingTop: "100px", paddingBottom: "4rem", minHeight: "100vh", position: "relative", zIndex: 10 }}>
      <div className="container-main" style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 120px)" }}>
        
        {/* Header Section */}
        <div style={{ marginBottom: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <span className="section-label">Resume</span>
            <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800 }}>Resume</h1>
          </div>
          
          <a
            href="/resume.pdf"
            download="Aman_Patre_Resume.pdf"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.6rem 1.25rem",
              background: "var(--accent)",
              color: "#000",
              borderRadius: "4px",
              fontWeight: 600,
              fontSize: "0.9rem",
              textDecoration: "none",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            <Download size={16} />
            Download PDF
          </a>
        </div>

        {/* PDF Viewer Section */}
        <div 
          style={{ 
            flex: 1, 
            width: "100%", 
            background: "rgba(10, 15, 25, 0.6)",
            border: "1px solid var(--border)",
            borderRadius: "8px",
            overflow: "hidden",
            position: "relative",
            backdropFilter: "blur(12px)",
          }}
        >
          {hasError ? (
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem", textAlign: "center" }}>
              <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>📄</div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 600, marginBottom: "0.5rem", color: "var(--text)" }}>Resume not found</h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", maxWidth: "400px" }}>
                Please make sure you have uploaded a file named <code style={{ color: "var(--accent)" }}>resume.pdf</code> to the <code style={{ color: "var(--accent)" }}>public/</code> directory in your project folder.
              </p>
            </div>
          ) : (
            <iframe
              src="/resume.pdf#toolbar=0&navpanes=0&scrollbar=0"
              style={{ width: "100%", height: "100%", border: "none" }}
              title="Aman Patre Resume"
              onError={() => setHasError(true)}
              onLoad={(e) => {
                // If it fails to load the PDF natively, many browsers won't fire onError.
                // It might load an empty page. We rely on the user to put resume.pdf in public folder.
              }}
            />
          )}
        </div>

      </div>
    </div>
  );
}
