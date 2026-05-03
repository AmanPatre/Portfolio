"use client";
import { useEffect, useRef } from "react";

export default function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let W = window.innerWidth;
    let H = window.innerHeight;
    let frame = 0;

    canvas.width = W;
    canvas.height = H;

    // ── Stars ─────────────────────────────────────────────────────────
    type Star = {
      x: number; y: number;
      r: number; alpha: number;
      phase: number; speed: number;
      color: string;
    };

    const makeStars = (n: number, rMin: number, rMax: number, aMin: number, aMax: number, colors: string[]): Star[] =>
      Array.from({ length: n }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * (rMax - rMin) + rMin,
        alpha: Math.random() * (aMax - aMin) + aMin,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.016 + 0.004,
        color: colors[Math.floor(Math.random() * colors.length)],
      }));

    // Three layers: deep, mid, near — all very white/neutral to match green theme
    const deep = makeStars(600, 0.15, 0.55, 0.08, 0.30, ["255,255,255", "220,230,255"]);
    const mid  = makeStars(250, 0.45, 1.1,  0.20, 0.55, ["255,255,255", "240,245,255"]);
    const near = makeStars(80,  1.0,  2.2,  0.45, 0.90, ["255,255,255", "255,252,240"]);

    // ── Nebula offscreen ──────────────────────────────────────────────
    const ofc = document.createElement("canvas");
    ofc.width = W; ofc.height = H;
    const oc = ofc.getContext("2d")!;

    // Very subtle cyan-tinted nebula clouds only
    const nebulas = [
      { x: W * 0.08, y: H * 0.15, rx: W * 0.30, ry: H * 0.35, r: 0,  g: 150, b: 255, a: 0.025 },
      { x: W * 0.88, y: H * 0.72, rx: W * 0.25, ry: H * 0.35, r: 0,  g: 120, b: 200, a: 0.020 },
      { x: W * 0.50, y: H * 0.50, rx: W * 0.40, ry: H * 0.40, r: 0,  g: 210, b: 255, a: 0.012 },
      { x: W * 0.75, y: H * 0.20, rx: W * 0.18, ry: H * 0.22, r: 0,  g: 130, b: 220, a: 0.018 },
    ];

    nebulas.forEach(({ x, y, rx, ry, r, g, b, a }) => {
      oc.save();
      oc.translate(x, y);
      oc.scale(rx / Math.max(rx, ry), ry / Math.max(rx, ry));
      const R = Math.max(rx, ry);
      const grd = oc.createRadialGradient(0, 0, 0, 0, 0, R);
      grd.addColorStop(0,   `rgba(${r},${g},${b},${a})`);
      grd.addColorStop(0.5, `rgba(${r},${g},${b},${a * 0.4})`);
      grd.addColorStop(1,   `rgba(${r},${g},${b},0)`);
      oc.fillStyle = grd;
      oc.beginPath();
      oc.arc(0, 0, R, 0, Math.PI * 2);
      oc.fill();
      oc.restore();
    });

    // ── Meteors ───────────────────────────────────────────────────────
    type Meteor = { x: number; y: number; vx: number; vy: number; len: number; life: number; max: number; w: number; };
    const meteors: Meteor[] = [];
    let nextMeteor = 150 + Math.random() * 200;

    function spawnMeteor() {
      const angle = (Math.random() * 20 + 18) * (Math.PI / 180);
      const speed = Math.random() * 12 + 7;
      meteors.push({
        x: Math.random() * W * 0.85,
        y: Math.random() * H * 0.4,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        len: Math.random() * 130 + 70,
        life: 0,
        max: Math.random() * 30 + 20,
        w: Math.random() * 1.0 + 0.5,
      });
    }

    // ── Draw ──────────────────────────────────────────────────────────
    function draw() {
      frame++;
      ctx!.clearRect(0, 0, W, H);

      // Base: pure near-black with very slight blue-dark bias
      ctx!.fillStyle = "#04080f";
      ctx!.fillRect(0, 0, W, H);

      // Subtle nebula
      ctx!.globalAlpha = 1;
      ctx!.drawImage(ofc, 0, 0);

      // Stars
      function drawLayer(stars: Star[]) {
        for (const s of stars) {
          const tw = Math.sin(frame * s.speed + s.phase);
          const a = Math.max(0.04, s.alpha + tw * 0.18);
          const sz = s.r * (1 + tw * 0.1);

          ctx!.save();
          // Soft glow on brighter stars
          if (sz > 1.2 && a > 0.5) {
            const halo = ctx!.createRadialGradient(s.x, s.y, 0, s.x, s.y, sz * 5);
            halo.addColorStop(0, `rgba(${s.color},${a * 0.25})`);
            halo.addColorStop(1, `rgba(${s.color},0)`);
            ctx!.fillStyle = halo;
            ctx!.beginPath();
            ctx!.arc(s.x, s.y, sz * 5, 0, Math.PI * 2);
            ctx!.fill();
          }
          ctx!.fillStyle = `rgba(${s.color},${a})`;
          ctx!.beginPath();
          ctx!.arc(s.x, s.y, sz, 0, Math.PI * 2);
          ctx!.fill();
          ctx!.restore();
        }
      }

      drawLayer(deep);
      drawLayer(mid);
      drawLayer(near);

      // Meteors
      if (frame >= nextMeteor) {
        spawnMeteor();
        nextMeteor = frame + 120 + Math.random() * 250;
      }

      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.life++;
        if (m.life >= m.max) { meteors.splice(i, 1); continue; }

        const p = m.life / m.max;
        const opacity = p < 0.15 ? p / 0.15 : 1 - (p - 0.15) / 0.85;

        const tx = m.x - (m.vx / Math.hypot(m.vx, m.vy)) * m.len;
        const ty = m.y - (m.vy / Math.hypot(m.vx, m.vy)) * m.len;

        const mg = ctx!.createLinearGradient(tx, ty, m.x, m.y);
        mg.addColorStop(0,   "rgba(255,255,255,0)");
        mg.addColorStop(0.7, `rgba(220,240,255,${opacity * 0.55})`);
        mg.addColorStop(1,   `rgba(255,255,255,${opacity})`);

        ctx!.save();
        ctx!.strokeStyle = mg;
        ctx!.lineWidth = m.w;
        ctx!.shadowColor = "rgba(200,230,255,0.6)";
        ctx!.shadowBlur = 3;
        ctx!.beginPath();
        ctx!.moveTo(tx, ty);
        ctx!.lineTo(m.x, m.y);
        ctx!.stroke();
        ctx!.restore();

        m.x += m.vx;
        m.y += m.vy;
      }

      // Vignette — dark edges only, no color tint
      const vig = ctx!.createRadialGradient(W / 2, H / 2, H * 0.3, W / 2, H / 2, H * 0.95);
      vig.addColorStop(0, "rgba(0,0,0,0)");
      vig.addColorStop(1, "rgba(0,0,0,0.65)");
      ctx!.fillStyle = vig;
      ctx!.fillRect(0, 0, W, H);

      animId = requestAnimationFrame(draw);
    }

    draw();

    function onResize() {
      if (!canvas) return;
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
      [...deep, ...mid, ...near].forEach(s => {
        s.x = Math.random() * W;
        s.y = Math.random() * H;
      });
    }

    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", display: "block" }}
    />
  );
}
