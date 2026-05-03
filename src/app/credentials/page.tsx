import CredentialCard from "@/components/CredentialCard";
import { CREDENTIALS } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Credentials — Aman Patre",
  description: "Certificates, awards, and recognitions earned by Aman Patre.",
};

export default function CredentialsPage() {
  return (
    <div style={{ paddingTop: "100px", paddingBottom: "4rem", position: "relative", zIndex: 10 }}>
      <div className="container-main">
        <div style={{ marginBottom: "3rem" }}>

          <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, marginBottom: "0.75rem" }}>Credentials</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", maxWidth: "480px", lineHeight: 1.7 }}>
            Certificates, recognitions, and course completions along the journey.
          </p>
        </div>

        {/* Category legend */}
        <div style={{ display: "flex", gap: "1.25rem", marginBottom: "2rem", flexWrap: "wrap" }}>
          {[
            { label: "Certificate", color: "var(--accent)" },
            { label: "Course", color: "#60a5fa" },
            { label: "Hackathon", color: "#f59e0b" },
            { label: "Recognition", color: "#a78bfa" },
          ].map(({ label, color }) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: color, display: "block" }} />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</span>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.25rem" }}>
          {CREDENTIALS.map((cred, i) => <CredentialCard key={cred.id} cred={cred} index={i} />)}
        </div>
      </div>
    </div>
  );
}
