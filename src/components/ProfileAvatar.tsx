"use client";
import React from "react";
import Image from "next/image";

interface ProfileAvatarProps {
  photoSrc?: string;
  photoAlt?: string;
}

const BADGES = [
  { label: "Full Stack", icon: "⚡", angle: 40, radius: 155 },
  { label: "Node.js", icon: "🟢", angle: 155, radius: 155 },
  { label: "React", icon: "⚛", angle: 260, radius: 155 },
];

export default function ProfileAvatar({
  photoSrc,
  photoAlt = "Aman Patre",
}: ProfileAvatarProps) {
  return (
    <div className="pa-root">
      {/* Background glow blobs */}
      <div className="pa-blob pa-blob1" />
      <div className="pa-blob pa-blob2" />

      {/* Outer dashed orbit ring */}
      <div className="pa-orbit pa-orbit-outer" />
      {/* Inner orbit ring */}
      <div className="pa-orbit pa-orbit-inner" />

      {/* Floating badges on orbit */}
      {BADGES.map(({ label, icon, angle, radius }) => {
        const rad = (angle * Math.PI) / 180;
        const x = Math.cos(rad) * radius;
        const y = Math.sin(rad) * radius;
        return (
          <div
            key={label}
            className="pa-badge"
            style={{
              transform: `translate(${x}px, ${y}px)`,
            }}
          >
            <span className="pa-badge-icon">{icon}</span>
            <span className="pa-badge-label">{label}</span>
          </div>
        );
      })}

      {/* Corner accent lines */}
      <svg className="pa-corners" viewBox="0 0 340 340" width="340" height="340">
        {/* Top-left */}
        <path d="M 40 80 L 40 40 L 80 40" stroke="rgba(0,229,255,0.4)" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* Top-right */}
        <path d="M 260 40 L 300 40 L 300 80" stroke="rgba(0,229,255,0.4)" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* Bottom-left */}
        <path d="M 40 260 L 40 300 L 80 300" stroke="rgba(0,229,255,0.4)" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* Bottom-right */}
        <path d="M 260 300 L 300 300 L 300 260" stroke="rgba(0,229,255,0.4)" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* Tick marks */}
        <line x1="170" y1="28" x2="170" y2="40" stroke="rgba(0,229,255,0.3)" strokeWidth="1.5" />
        <line x1="28" y1="170" x2="40" y2="170" stroke="rgba(0,229,255,0.3)" strokeWidth="1.5" />
        <line x1="170" y1="300" x2="170" y2="312" stroke="rgba(0,229,255,0.3)" strokeWidth="1.5" />
        <line x1="300" y1="170" x2="312" y2="170" stroke="rgba(0,229,255,0.3)" strokeWidth="1.5" />
      </svg>

      {/* Main photo ring */}
      <div className="pa-photo-ring">
        <div className="pa-photo-inner">
          {photoSrc ? (
            <Image
              src={photoSrc}
              alt={photoAlt}
              fill
              style={{ objectFit: "cover", borderRadius: "50%" }}
            />
          ) : (
            <div className="pa-initials">AP</div>
          )}
        </div>
        {/* Spinning gradient arc */}
        <div className="pa-spin-arc" />
      </div>

      {/* Status dot */}
      <div className="pa-status">
        <span className="pa-status-dot" />
        <span className="pa-status-text">Available</span>
      </div>

      {/* Data readouts */}
      <div className="pa-readout pa-readout-tl">
        <span className="pa-readout-key">Stack</span>
        <span className="pa-readout-val">MERN</span>
      </div>
      <div className="pa-readout pa-readout-tr">
        <span className="pa-readout-key">Open to</span>
        <span className="pa-readout-val">SDE / Intern</span>
      </div>
      <div className="pa-readout pa-readout-bl">
        <span className="pa-readout-key">Based</span>
        <span className="pa-readout-val">India 🇮🇳</span>
      </div>
      <div className="pa-readout pa-readout-br">
        <span className="pa-readout-key">Node</span>
        <span className="pa-readout-val">v20 ✓</span>
      </div>

      <style jsx global>{`
        .pa-root {
          position: relative;
          width: 340px;
          height: 340px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          animation: pa-float 6s ease-in-out infinite;
        }

        /* Glow blobs */
        .pa-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(40px);
          pointer-events: none;
        }
        .pa-blob1 {
          width: 220px;
          height: 220px;
          background: radial-gradient(circle, rgba(0,180,220,0.18) 0%, transparent 70%);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: pa-pulse 4s ease-in-out infinite;
        }
        .pa-blob2 {
          width: 160px;
          height: 160px;
          background: radial-gradient(circle, rgba(0,100,255,0.12) 0%, transparent 70%);
          top: 30%;
          left: 30%;
          transform: translate(-50%, -50%);
          animation: pa-pulse 6s ease-in-out infinite reverse;
        }

        /* Orbit rings */
        .pa-orbit {
          position: absolute;
          border-radius: 50%;
          border: 1px dashed rgba(0, 229, 255, 0.15);
          pointer-events: none;
        }
        .pa-orbit-outer {
          width: 310px;
          height: 310px;
          animation: pa-rotateCW 30s linear infinite;
          border-color: rgba(0, 229, 255, 0.12);
          border-style: dashed;
        }
        .pa-orbit-inner {
          width: 240px;
          height: 240px;
          animation: pa-rotateCCW 20s linear infinite;
          border-color: rgba(0, 180, 220, 0.1);
        }

        /* Floating badges */
        .pa-badge {
          position: absolute;
          top: 50%;
          left: 50%;
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 5px 10px;
          background: rgba(10, 20, 35, 0.85);
          border: 1px solid rgba(0, 229, 255, 0.25);
          border-radius: 20px;
          backdrop-filter: blur(8px);
          white-space: nowrap;
          box-shadow: 0 0 12px rgba(0, 229, 255, 0.1);
          margin-top: -16px;
          margin-left: -40px;
          animation: pa-float 6s ease-in-out infinite;
        }
        .pa-badge:nth-child(5) { animation-delay: -2s; }
        .pa-badge:nth-child(6) { animation-delay: -4s; }

        .pa-badge-icon { font-size: 12px; }
        .pa-badge-label {
          font-family: monospace;
          font-size: 10px;
          color: rgba(0, 229, 255, 0.8);
          letter-spacing: 0.05em;
        }

        /* Corner brackets */
        .pa-corners {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        /* Main photo ring */
        .pa-photo-ring {
          position: relative;
          width: 180px;
          height: 180px;
          border-radius: 50%;
          padding: 3px;
          background: conic-gradient(
            from 0deg,
            #00e5ff 0%,
            #0057ff 30%,
            transparent 50%,
            #00e5ff 70%,
            #00b4dc 100%
          );
          animation: pa-rotateCW 4s linear infinite;
          box-shadow:
            0 0 30px rgba(0, 229, 255, 0.25),
            0 0 60px rgba(0, 100, 255, 0.15);
          flex-shrink: 0;
          z-index: 2;
        }

        .pa-photo-inner {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: #060d1a;
          overflow: hidden;
          animation: pa-rotateCCW 4s linear infinite;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pa-initials {
          font-family: var(--font-display, 'Inter', sans-serif);
          font-size: 3.5rem;
          font-weight: 800;
          background: linear-gradient(135deg, #00e5ff, #0057ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -0.03em;
        }

        /* Status */
        .pa-status {
          position: absolute;
          bottom: 72px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(10, 20, 35, 0.9);
          border: 1px solid rgba(0, 255, 136, 0.2);
          border-radius: 20px;
          padding: 5px 12px;
          z-index: 3;
          white-space: nowrap;
          box-shadow: 0 0 16px rgba(0, 255, 136, 0.1);
        }
        .pa-status-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #00ff88;
          box-shadow: 0 0 8px #00ff88;
          animation: pa-blink 2s step-end infinite;
          flex-shrink: 0;
        }
        .pa-status-text {
          font-family: monospace;
          font-size: 10px;
          color: rgba(0, 255, 136, 0.8);
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        /* Readouts */
        .pa-readout {
          position: absolute;
          display: flex;
          flex-direction: column;
          z-index: 3;
          animation: pa-hud-flicker 8s infinite;
        }
        .pa-readout-key {
          font-family: monospace;
          font-size: 8px;
          color: rgba(0, 229, 255, 0.4);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .pa-readout-val {
          font-family: monospace;
          font-size: 10px;
          color: rgba(0, 229, 255, 0.75);
          letter-spacing: 0.04em;
          font-weight: bold;
        }
        .pa-readout-tl { top: 50px; left: 18px; }
        .pa-readout-tr { top: 50px; right: 18px; text-align: right; }
        .pa-readout-bl { bottom: 50px; left: 18px; }
        .pa-readout-br { bottom: 50px; right: 18px; text-align: right; }

        /* Keyframes */
        @keyframes pa-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pa-pulse {
          0%, 100% { opacity: 0.8; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
        }
        @keyframes pa-rotateCW {
          to { transform: rotate(360deg); }
        }
        @keyframes pa-rotateCCW {
          to { transform: rotate(-360deg); }
        }
        @keyframes pa-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @keyframes pa-hud-flicker {
          0%, 91%, 95%, 100% { opacity: 1; }
          93% { opacity: 0.35; }
        }
      `}</style>
    </div>
  );
}
