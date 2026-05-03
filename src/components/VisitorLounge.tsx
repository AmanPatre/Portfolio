"use client";
import { useEffect, useRef, useState } from "react";
import { Send, Smile, Image as ImageIcon, X } from "lucide-react";
import { generateUsername, getCountryFlag, timeAgo } from "@/lib/utils";
import type { LoungeMessage } from "@/lib/types";

const EMOJIS = ["👍", "❤️", "😂", "🔥", "🚀", "👏", "💯", "🎯"];

export default function VisitorLounge() {
  const [messages, setMessages] = useState<LoungeMessage[]>([]);
  const [input, setInput] = useState("");
  const [username, setUsername] = useState("");
  const [mounted, setMounted] = useState(false);
  const [countryCode] = useState("IN");
  const [showGif, setShowGif] = useState(false);
  const [gifQuery, setGifQuery] = useState("");
  const [gifs, setGifs] = useState<{ id: string; url: string; preview: string; title: string }[]>([]);
  const [typing, setTyping] = useState<string[]>([]);
  const [reactions, setReactions] = useState<Record<string, Record<string, number>>>({});
  const bottomRef = useRef<HTMLDivElement>(null);
  const typingTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load history
  useEffect(() => {
    setMounted(true);
    let u = sessionStorage.getItem("lounge_username");
    if (!u) {
      u = generateUsername();
      sessionStorage.setItem("lounge_username", u);
    }
    setUsername(u);

    fetch("/api/lounge/message")
      .then((r) => r.json())
      .then((d) => setMessages(d.messages || []))
      .catch(() => {});
  }, []);

  // SSE stream
  useEffect(() => {
    const es = new EventSource("/api/lounge/stream");
    es.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        if (data.type === "message") {
          setMessages((prev) => {
            if (prev.some((m) => m.id === data.message.id)) return prev;
            return [...prev, data.message];
          });
        }
      } catch {}
    };
    return () => es.close();
  }, []);

  // Auto-scroll
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  async function handleSend(text?: string, gifUrl?: string) {
    const content = text || input.trim();
    if (!content && !gifUrl) return;
    setInput("");

    await fetch("/api/lounge/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: content, gifUrl, username, countryCode }),
    }).then((r) => r.json()).then((d) => {
      if (d.message) setMessages((prev) => [...prev.filter((m) => m.id !== d.message.id), d.message]);
    }).catch(() => {});
  }

  function handleTyping() {
    if (typingTimeout.current) clearTimeout(typingTimeout.current);
    fetch("/api/lounge/typing", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username }) }).catch(() => {});
    typingTimeout.current = setTimeout(() => {}, 3000);
  }

  async function searchGifs(q: string) {
    if (!q.trim()) return;
    const res = await fetch(`/api/lounge/gif-search?q=${encodeURIComponent(q)}`);
    const data = await res.json();
    setGifs(data.gifs || []);
  }

  async function react(messageId: string, emoji: string) {
    setReactions((prev) => ({
      ...prev,
      [messageId]: { ...(prev[messageId] || {}), [emoji]: ((prev[messageId] || {})[emoji] || 0) + 1 },
    }));
    await fetch("/api/lounge/react", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messageId, emoji }) }).catch(() => {});
  }

  return (
    <section className="section-pad" id="lounge" style={{ position: "relative", zIndex: 10 }}>
      <div className="container-main">
        <div style={{ marginBottom: "2rem" }}>
          <span className="section-label">Live</span>
          <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 800 }}>Visitor Lounge</h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginTop: "0.4rem" }}>
            Logged in as: <span style={{ fontFamily: "var(--font-mono)", color: "var(--accent)", fontWeight: 500 }}>{mounted ? `${getCountryFlag(countryCode)} ${username}` : "..."}</span>
          </p>
        </div>

        <div style={{ border: "1px solid var(--border)", borderRadius: "8px", overflow: "hidden", background: "rgba(5,10,6,0.85)", backdropFilter: "blur(16px)" }}>
          {/* Messages */}
          <div style={{ height: "340px", overflowY: "auto", padding: "1rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {messages.length === 0 && (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--text-muted)", opacity: 0.5 }}>
                No messages yet. Say hi! 👋
              </div>
            )}
            {messages.map((msg) => (
              <div key={msg.id} style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--accent)", fontWeight: 600 }}>
                    {getCountryFlag(msg.countryCode)} {msg.username}
                  </span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--text-muted)", opacity: 0.5 }}>{timeAgo(msg.timestamp)}</span>
                </div>
                {msg.text && <p style={{ fontSize: "0.85rem", color: "var(--text)", paddingLeft: "0.25rem", lineHeight: 1.6 }}>{msg.text}</p>}
                {msg.gifUrl && <img src={msg.gifUrl} alt="gif" style={{ maxWidth: "200px", borderRadius: "4px" }} />}
                {/* Emoji reactions */}
                <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap", marginTop: "0.2rem" }}>
                  {EMOJIS.map((emoji) => {
                    const count = (reactions[msg.id] || {})[emoji] || 0;
                    return count > 0 ? (
                      <button key={emoji} onClick={() => react(msg.id, emoji)}
                        style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", padding: "0.1rem 0.4rem", background: "rgba(0,210,255,0.06)", border: "1px solid rgba(0,210,255,0.15)", borderRadius: "12px", cursor: "pointer", color: "var(--text-muted)" }}>
                        {emoji} {count}
                      </button>
                    ) : null;
                  })}
                  <button onClick={() => {
                    const emoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
                    react(msg.id, emoji);
                  }}
                    style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", padding: "0.1rem 0.4rem", background: "transparent", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "12px", cursor: "pointer", color: "var(--text-muted)", opacity: 0.4 }}>
                    +
                  </button>
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* GIF picker */}
          {showGif && (
            <div style={{ borderTop: "1px solid var(--border)", padding: "0.75rem" }}>
              <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.75rem" }}>
                <input value={gifQuery} onChange={(e) => setGifQuery(e.target.value)} onKeyDown={(e) => e.key === "Enter" && searchGifs(gifQuery)}
                  placeholder="search GIFs..." className="terminal-input" style={{ flex: 1, borderRadius: "4px", fontSize: "0.8rem", padding: "0.5rem" }} />
                <button onClick={() => searchGifs(gifQuery)} style={{ padding: "0.5rem 0.85rem", background: "var(--accent)", color: "#050a06", fontFamily: "var(--font-mono)", fontSize: "0.7rem", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                  search
                </button>
                <button onClick={() => { setShowGif(false); setGifs([]); }} style={{ padding: "0.5rem", background: "transparent", border: "1px solid var(--border)", color: "var(--text-muted)", borderRadius: "4px", cursor: "pointer" }}>
                  <X size={14} />
                </button>
              </div>
              <div style={{ display: "flex", gap: "0.5rem", overflowX: "auto", paddingBottom: "0.25rem" }}>
                {gifs.map((gif) => (
                  <img key={gif.id} src={gif.preview} alt={gif.title} onClick={() => { handleSend("", gif.url); setShowGif(false); }}
                    style={{ height: "80px", borderRadius: "4px", cursor: "pointer", flexShrink: 0 }} />
                ))}
                {gifs.length === 0 && <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--text-muted)", opacity: 0.4 }}>search to see GIFs</span>}
              </div>
            </div>
          )}

          {/* Input bar */}
          <div style={{ borderTop: "1px solid var(--border)", padding: "0.85rem", display: "flex", gap: "0.5rem" }}>
            <button onClick={() => setShowGif(!showGif)} title="GIF"
              style={{ padding: "0.6rem", background: "transparent", border: "1px solid var(--border)", color: "var(--text-muted)", borderRadius: "4px", cursor: "pointer", flexShrink: 0 }}>
              <ImageIcon size={14} />
            </button>
            <input value={input} onChange={(e) => { setInput(e.target.value); handleTyping(); }}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
              placeholder={mounted ? `${username}> say something...` : "> say something..."}
              className="terminal-input"
              style={{ flex: 1, borderRadius: "4px", fontSize: "0.82rem" }} />
            <button onClick={() => handleSend()} disabled={!input.trim()}
              style={{ display: "flex", alignItems: "center", gap: "0.35rem", padding: "0.6rem 1rem", background: "var(--accent)", color: "#050a06", fontFamily: "var(--font-mono)", fontSize: "0.72rem", fontWeight: 700, border: "none", borderRadius: "4px", cursor: input.trim() ? "pointer" : "not-allowed", opacity: input.trim() ? 1 : 0.5, flexShrink: 0 }}>
              <Send size={13} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
