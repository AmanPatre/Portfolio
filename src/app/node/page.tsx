"use client";
import { useState, useRef, useEffect } from "react";
import { Send, Bot, User } from "lucide-react";
import type { Metadata } from "next";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

const SUGGESTIONS = [
  "What projects has he built?",
  "Should I hire him?",
  "What's his tech stack?",
  "Tell me about his internship",
  "What ML work has he done?",
  "How do I contact him?",
  "What's his educational background?",
];

const INITIAL_MSG: Message = {
  role: "assistant",
  content: `Hello! I'm NODE, Aman's AI assistant.\nI know everything about him — his projects, skills, internship, goals, and more.\nWhat would you like to know?`,
  timestamp: Date.now(),
};

function timeStr(ts: number) {
  return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function NodePage() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MSG]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return;
    const userMsg: Message = { role: "user", content: text.trim(), timestamp: Date.now() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/node", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok) throw new Error("API error");
      const reader = res.body?.getReader();
      if (!reader) throw new Error("No reader");

      const decoder = new TextDecoder();
      let assistantText = "";
      const aiMsg: Message = { role: "assistant", content: "", timestamp: Date.now() };
      setMessages((prev) => [...prev, aiMsg]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") break;
            try {
              const parsed = JSON.parse(data);
              const delta = parsed.choices?.[0]?.delta?.content || "";
              assistantText += delta;
              setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = { ...aiMsg, content: assistantText };
                return updated;
              });
            } catch {}
          }
        }
      }
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "node> Sorry, I encountered an error. Please check your GEMINI_API_KEY.", timestamp: Date.now() }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ paddingTop: "80px", height: "100vh", display: "flex", flexDirection: "column", position: "relative", zIndex: 10 }}>
      {/* Header */}
      <div style={{ padding: "1rem 1.5rem", borderBottom: "1px solid var(--border)", background: "rgba(5,10,6,0.9)", backdropFilter: "blur(16px)" }}>
        <div className="container-main" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Bot size={16} style={{ color: "var(--accent)" }} />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--accent)", fontWeight: 600 }}>NODE v1.0.0</span>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--accent)", boxShadow: "0 0 6px var(--accent)", display: "inline-block" }} />
            </div>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>
              Powered by Google Gemini 1.5 Flash · Edge Runtime · &lt;1s globally
            </p>
          </div>

        </div>
      </div>

      {/* Chat window */}
      <div style={{ flex: 1, overflow: "auto", padding: "1.5rem" }}>
        <div className="container-main" style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "760px" }}>
          {messages.map((msg, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", gap: "0.25rem", alignItems: msg.role === "user" ? "flex-end" : "flex-start" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                {msg.role === "assistant" && <Bot size={12} style={{ color: "var(--accent)" }} />}
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "var(--text-muted)" }}>
                  {msg.role === "assistant" ? "node>" : "you>"} {timeStr(msg.timestamp)}
                </span>
                {msg.role === "user" && <User size={12} style={{ color: "var(--text-muted)" }} />}
              </div>
              <div
                className="chat-bubble"
                style={{
                maxWidth: "75%",
                padding: "0.85rem 1.1rem",
                background: msg.role === "assistant" ? "rgba(0,210,255,0.05)" : "rgba(255,255,255,0.06)",
                border: `1px solid ${msg.role === "assistant" ? "rgba(0,210,255,0.15)" : "rgba(255,255,255,0.08)"}`,
                borderRadius: "6px",
                borderTopLeftRadius: msg.role === "assistant" ? "2px" : "6px",
                borderTopRightRadius: msg.role === "user" ? "2px" : "6px",
              }}>
                <p style={{
                  fontFamily: msg.role === "assistant" ? "var(--font-mono)" : "var(--font-display)",
                  fontSize: "0.85rem",
                  color: msg.role === "assistant" ? "var(--accent)" : "var(--text)",
                  lineHeight: 1.7,
                  whiteSpace: "pre-wrap",
                }}>
                  {msg.content}
                </p>
              </div>
            </div>
          ))}

          {loading && (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem", alignItems: "flex-start" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "var(--text-muted)" }}>node&gt;</span>
              <div style={{ padding: "0.85rem 1.1rem", background: "rgba(0,210,255,0.05)", border: "1px solid rgba(0,210,255,0.15)", borderRadius: "6px", borderTopLeftRadius: "2px" }}>
                <span style={{ fontFamily: "var(--font-mono)", color: "var(--accent)", fontSize: "0.85rem" }}>
                  ▋<span style={{ animation: "blink 0.8s step-end infinite" }} />
                </span>
              </div>
            </div>
          )}

          {/* Suggestions */}
          {messages.length === 1 && (
            <div className="node-suggestions" style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.5rem" }}>
              {SUGGESTIONS.map((s) => (
                <button key={s} onClick={() => sendMessage(s)}
                  className="node-suggestion-btn"
                  style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", padding: "0.4rem 0.8rem", background: "rgba(0,210,255,0.05)", border: "1px solid rgba(0,210,255,0.2)", borderRadius: "4px", color: "var(--accent2)", cursor: "pointer", transition: "all 0.2s ease" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(0,210,255,0.1)"; (e.currentTarget as HTMLElement).style.color = "var(--accent)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(0,210,255,0.05)"; (e.currentTarget as HTMLElement).style.color = "var(--accent2)"; }}>
                  {s}
                </button>
              ))}
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input bar */}
      <div className="node-input-bar" style={{ borderTop: "1px solid var(--border)", background: "rgba(5,10,6,0.95)", backdropFilter: "blur(16px)", padding: "1rem 1.5rem" }}>
        <div className="container-main" style={{ maxWidth: "760px" }}>
          <form onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
            style={{ display: "flex", gap: "0.75rem" }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="ask node anything..."
              disabled={loading}
              className="terminal-input"
              style={{ flex: 1, borderRadius: "4px" }}
            />
            <button type="submit" disabled={loading || !input.trim()}
              className="node-send-btn"
              style={{ display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.75rem 1.25rem", background: "var(--accent)", color: "#050a06", fontFamily: "var(--font-mono)", fontSize: "0.75rem", fontWeight: 700, border: "none", borderRadius: "4px", cursor: loading || !input.trim() ? "not-allowed" : "pointer", opacity: loading || !input.trim() ? 0.5 : 1, transition: "all 0.2s", whiteSpace: "nowrap" }}>
              <Send size={13} /> send ↵
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
