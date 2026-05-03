"use client";
import { useEffect, useState } from "react";
import { Activity, Cpu, HardDrive, Clock, Globe, Code2, RefreshCw } from "lucide-react";

interface SpectrumData {
  uptime: number;
  memoryUsed: number;
  memoryTotal: number;
  nodeVersion: string;
  stats: { projects: number; skills: number; credentials: number };
  visitors: { total: number; daily: number; weekly: number; monthly: number };
  timestamp: number;
}

function fmtUptime(s: number) {
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  return `${d}d ${h}h ${m}m`;
}

function StatCard({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: string; sub?: string }) {
  return (
    <div style={{ padding: "1.25rem", background: "rgba(10,15,11,0.8)", backdropFilter: "blur(16px)", border: "1px solid var(--border)", borderLeft: "3px solid var(--accent)", borderRadius: "6px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
        <span style={{ color: "var(--accent)" }}>{icon}</span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{label}</span>
      </div>
      <div style={{ fontSize: "1.6rem", fontWeight: 700, color: "var(--accent)", lineHeight: 1, fontFamily: "var(--font-mono)" }}>{value}</div>
      {sub && <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--text-muted)", marginTop: "0.35rem" }}>{sub}</div>}
    </div>
  );
}

export default function SpectrumPage() {
  const [data, setData] = useState<SpectrumData | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

  async function fetchData() {
    setLoading(true);
    try {
      const res = await fetch("/api/spectrum");
      if (res.ok) { setData(await res.json()); setLastRefresh(new Date()); }
    } finally { setLoading(false); }
  }

  useEffect(() => {
    fetchData();
    const iv = setInterval(fetchData, 60000);
    return () => clearInterval(iv);
  }, []);

  return (
    <div style={{ paddingTop: "100px", paddingBottom: "4rem", position: "relative", zIndex: 10 }}>
      <div className="container-main">
        <div style={{ marginBottom: "3rem", display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--text-muted)", display: "block", marginBottom: "0.5rem" }}>
              &gt; systemctl status portfolio
            </span>
            <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700 }}>Spectrum</h1>
            <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginTop: "0.5rem", fontFamily: "var(--font-mono)" }}>
              Live server health · auto-refreshes every 60s
            </p>
          </div>
          <button onClick={fetchData} disabled={loading}
            style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.6rem 1rem", background: "transparent", border: "1px solid rgba(0,210,255,0.25)", borderRadius: "4px", color: "var(--accent)", fontFamily: "var(--font-mono)", fontSize: "0.72rem", cursor: "pointer", opacity: loading ? 0.5 : 1 }}>
            <RefreshCw size={13} style={{ animation: loading ? "spin 1s linear infinite" : "none" }} /> refresh
          </button>
        </div>

        {loading && !data ? (
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--text-muted)" }}>
            <span style={{ animation: "blink 0.8s step-end infinite" }}>▋</span> loading system stats...
          </div>
        ) : data ? (
          <>
            {/* Server stats */}
            <div style={{ marginBottom: "1rem" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>// server</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
              <StatCard icon={<Clock size={14} />} label="Uptime" value={fmtUptime(data.uptime)} />
              <StatCard icon={<HardDrive size={14} />} label="Memory" value={`${data.memoryUsed}MB`} sub={`of ${data.memoryTotal}MB used`} />
              <StatCard icon={<Cpu size={14} />} label="Runtime" value={data.nodeVersion} sub="Node.js version" />
              <StatCard icon={<Activity size={14} />} label="Status" value="ONLINE" sub="all systems operational" />
            </div>

            {/* Content stats */}
            <div style={{ marginBottom: "1rem" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>// content</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
              <StatCard icon={<Code2 size={14} />} label="Projects" value={String(data.stats.projects)} sub="total in portfolio" />
              <StatCard icon={<Code2 size={14} />} label="Skills" value={String(data.stats.skills)} sub="across all categories" />
              <StatCard icon={<Code2 size={14} />} label="Credentials" value={String(data.stats.credentials)} sub="certs & awards" />
            </div>

            {/* Visitor stats */}
            <div style={{ marginBottom: "1rem" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>// visitors</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
              <StatCard icon={<Globe size={14} />} label="All-time" value={String(data.visitors?.total ?? "—")} />
              <StatCard icon={<Globe size={14} />} label="Today" value={String(data.visitors?.daily ?? "—")} />
              <StatCard icon={<Globe size={14} />} label="This Week" value={String(data.visitors?.weekly ?? "—")} />
              <StatCard icon={<Globe size={14} />} label="This Month" value={String(data.visitors?.monthly ?? "—")} />
            </div>

            {lastRefresh && (
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "var(--text-muted)", opacity: 0.5 }}>
                last updated: {lastRefresh.toLocaleTimeString()}
              </p>
            )}
          </>
        ) : (
          <p style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>failed to load stats</p>
        )}
      </div>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
