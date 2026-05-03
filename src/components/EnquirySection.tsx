"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail } from "lucide-react";
import { Github, Linkedin as Li } from "@/components/Icons";

export default function EnquirySection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "ok" : "err");
      if (res.ok) setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("err");
    }
  }

  const contactLinks = [
    { icon: <Mail size={15} />, label: "Email", value: "amanpatre25@gmail.com", href: "mailto:amanpatre25@gmail.com" },
    { icon: <Github size={15} />, label: "GitHub", value: "github.com/AmanPatre", href: "https://github.com/AmanPatre" },
    { icon: <Li size={15} />, label: "LinkedIn", value: "linkedin.com/in/aman-patre-2ab2a428a", href: "https://www.linkedin.com/in/aman-patre-2ab2a428a/" },
  ];

  return (
    <section className="section-pad" id="contact" style={{ position: "relative", zIndex: 10 }}>
      <div className="container-main">
        {/* Header */}
        <div style={{ marginBottom: "3rem" }}>
          <span className="section-label">Contact</span>
          <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 800 }}>Get In Touch</h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginTop: "0.75rem", maxWidth: "460px", lineHeight: 1.8 }}>
            Open to internships, collaborations, and interesting problems. Let&apos;s build something meaningful.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem" }} className="contact-grid">
          {/* Contact links */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.45 }}
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {contactLinks.map(({ icon, label, value, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: "0.9rem", padding: "0.9rem 1.1rem", background: "rgba(12,16,24,0.8)", border: "1px solid var(--border)", borderRadius: "8px", textDecoration: "none", transition: "border-color 0.2s, background 0.2s" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,210,255,0.3)"; (e.currentTarget as HTMLElement).style.background = "rgba(12,16,24,0.95)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.background = "rgba(12,16,24,0.8)"; }}
              >
                <span style={{ color: "var(--accent)", display: "flex", flexShrink: 0 }}>{icon}</span>
                <div>
                  <div style={{ fontSize: "0.72rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.1rem" }}>{label}</div>
                  <div style={{ fontSize: "0.82rem", color: "var(--text)", fontFamily: "var(--font-mono)" }}>{value}</div>
                </div>
              </a>
            ))}
          </motion.div>

          {/* Contact form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.1 }}
            style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
          >
            {[
              { name: "name", placeholder: "Your name", type: "text" },
              { name: "email", placeholder: "Your email", type: "email" },
            ].map(({ name, placeholder, type }) => (
              <input
                key={name}
                type={type}
                required
                placeholder={placeholder}
                value={form[name as keyof typeof form]}
                onChange={(e) => setForm({ ...form, [name]: e.target.value })}
                className="terminal-input"
              />
            ))}
            <textarea
              required
              rows={4}
              placeholder="Your message..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="terminal-input"
              style={{ resize: "vertical" }}
            />
            <button type="submit" disabled={status === "sending"}
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", padding: "0.8rem", background: "var(--accent)", color: "#04080f", fontFamily: "var(--font-display)", fontSize: "0.85rem", fontWeight: 700, border: "none", borderRadius: "8px", cursor: status === "sending" ? "wait" : "pointer", transition: "all 0.2s ease", opacity: status === "sending" ? 0.7 : 1 }}>
              <Send size={14} />
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>
            {status === "ok" && <p style={{ fontSize: "0.8rem", color: "var(--accent)", textAlign: "center" }}>✓ Message sent successfully</p>}
            {status === "err" && <p style={{ fontSize: "0.8rem", color: "#ff6b6b", textAlign: "center" }}>Something went wrong — try emailing directly</p>}
          </motion.form>
        </div>
      </div>
      <style>{`@media (max-width: 768px) { .contact-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}
