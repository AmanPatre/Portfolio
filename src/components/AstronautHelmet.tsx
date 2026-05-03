import React from 'react';
import Image from 'next/image';

interface AstronautHelmetProps {
  photoSrc?: string;
  photoAlt?: string;
}

export default function AstronautHelmet({ photoSrc, photoAlt = "Aman Patre" }: AstronautHelmetProps) {
  return (
    <div className="helmet-container">
      <div className="helmet-drifter">
        {/* SVG Helmet Base */}
        <svg
          width="270"
          height="290"
          viewBox="0 0 270 290"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="helmet-svg"
        >
          <defs>
            <radialGradient id="helmet-gradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1a3a5c" />
              <stop offset="100%" stopColor="#060d1a" />
            </radialGradient>
            <radialGradient id="helmet-shine" cx="30%" cy="20%" r="60%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </radialGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Dome */}
          <ellipse cx="135" cy="135" rx="120" ry="125" fill="url(#helmet-gradient)" />
          <ellipse cx="135" cy="135" rx="120" ry="125" fill="url(#helmet-shine)" />

          {/* Neck Guard */}
          <rect x="75" y="250" width="120" height="30" rx="5" fill="#0b172a" stroke="#1e3a5f" strokeWidth="2" />
          <line x1="85" y1="260" x2="185" y2="260" stroke="#1e3a5f" strokeWidth="2" />
          <line x1="85" y1="270" x2="185" y2="270" stroke="#1e3a5f" strokeWidth="2" />

          {/* Ear modules */}
          {/* Left */}
          <rect x="5" y="110" width="20" height="50" rx="3" fill="#0b172a" stroke="#1e3a5f" strokeWidth="2" />
          <rect x="10" y="115" width="10" height="15" fill="#1e3a5f" />
          <circle cx="15" cy="145" r="4" stroke="#00b4dc" strokeWidth="1" fill="none" />
          {/* Right */}
          <rect x="245" y="110" width="20" height="50" rx="3" fill="#0b172a" stroke="#1e3a5f" strokeWidth="2" />
          <rect x="250" y="115" width="10" height="15" fill="#1e3a5f" />
          <circle cx="255" cy="145" r="4" stroke="#00b4dc" strokeWidth="1" fill="none" />

          {/* Antenna */}
          <rect x="190" y="5" width="4" height="25" fill="#1e3a5f" />
          <circle cx="192" cy="5" r="5" fill="#00e5ff" filter="url(#glow)" />

          {/* Visor opening outlines */}
          <ellipse cx="135" cy="135" rx="90" ry="85" fill="none" stroke="rgba(0,180,220,0.5)" strokeWidth="2.5" />
          <ellipse cx="135" cy="135" rx="95" ry="90" fill="none" stroke="rgba(0,180,220,0.2)" strokeWidth="1" />
        </svg>

        {/* Visor Interior */}
        <div className="visor-interior">
          {/* Stars */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="star"
              style={{
                top: `${10 + Math.random() * 80}%`,
                left: `${10 + Math.random() * 80}%`,
                animationDelay: `${Math.random() * 3}s`
              }}
            />
          ))}

          {/* Center Image / Placeholder */}
          <div className="photo-container">
            {photoSrc ? (
              <Image src={photoSrc} alt={photoAlt} fill style={{ objectFit: 'cover' }} />
            ) : (
              <div className="placeholder">AP</div>
            )}
          </div>

          {/* Scanline */}
          <div className="scanline" />

          {/* Glare Overlay */}
          <div className="glare-overlay" />
        </div>

        {/* Pulsing Rim Glow */}
        <div className="rim-glow" />

        {/* HUD Readouts */}
        <div className="hud-element top-left">
          O₂ 98.2%<br />SYS NOMINAL<br />ALT 412 km
        </div>
        <div className="hud-element top-right">
          ID: AP-01<br />COMMS ON<br />▸ LIVE
        </div>
        <div className="hud-element bottom-left">
          TEMP 21°C<br />PWR 100%
        </div>
        <div className="hud-element bottom-right">
          NODE v20<br />BUILD ✓
        </div>

        {/* Orbit Rings */}
        <svg className="orbit orbit-cw" width="270" height="290" viewBox="0 0 270 290">
          <ellipse cx="135" cy="135" rx="100" ry="105" fill="none" stroke="rgba(0,229,255,0.4)" strokeWidth="1" strokeDasharray="6 10" />
        </svg>
        <svg className="orbit orbit-ccw" width="270" height="290" viewBox="0 0 270 290">
          <ellipse cx="135" cy="135" rx="110" ry="115" fill="none" stroke="rgba(0,229,255,0.2)" strokeWidth="1" strokeDasharray="3 14" />
        </svg>
      </div>

      <style jsx global>{`
        .helmet-container {
          position: relative;
          width: 270px;
          height: 290px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
        }

        .helmet-drifter {
          position: relative;
          width: 100%;
          height: 100%;
          animation: drift 6s ease-in-out infinite;
        }

        .helmet-svg {
          position: absolute;
          inset: 0;
          z-index: 2;
        }

        .visor-interior {
          position: absolute;
          left: 45px;
          top: 50px;
          width: 180px;
          height: 170px;
          border-radius: 50%;
          background: radial-gradient(ellipse at 40% 35%, #0d2a44 0%, #040d17 70%);
          overflow: hidden;
          z-index: 1;
        }

        .star {
          position: absolute;
          width: 2px;
          height: 2px;
          background: white;
          border-radius: 50%;
          animation: twinkle 3s infinite;
        }

        .photo-container {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100px;
          height: 100px;
          border-radius: 50%;
          overflow: hidden;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid rgba(0, 229, 255, 0.3);
          box-shadow: 0 0 20px rgba(0, 229, 255, 0.2);
        }

        .placeholder {
          font-family: monospace;
          color: rgba(0, 229, 255, 0.8);
          font-size: 2rem;
          font-weight: bold;
        }

        .scanline {
          position: absolute;
          left: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(to right, transparent, rgba(0,229,255,0.5), transparent);
          animation: scanline 4s linear infinite;
          z-index: 2;
        }

        .glare-overlay {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: linear-gradient(130deg, rgba(255,255,255,0.12) 0%, transparent 60%);
          pointer-events: none;
          z-index: 3;
        }

        .rim-glow {
          position: absolute;
          left: 45px;
          top: 50px;
          width: 180px;
          height: 170px;
          border-radius: 50%;
          animation: pulse 3s infinite;
          pointer-events: none;
          z-index: 3;
        }

        .hud-element {
          position: absolute;
          font-family: monospace;
          font-size: 9px;
          color: rgba(0,229,255,0.55);
          line-height: 1.5;
          animation: hudFlicker 8s infinite;
          z-index: 4;
          white-space: nowrap;
        }

        .top-left { top: 35px; left: 10px; }
        .top-right { top: 35px; right: 10px; text-align: right; }
        .bottom-left { bottom: 65px; left: 15px; }
        .bottom-right { bottom: 65px; right: 15px; text-align: right; }

        .orbit {
          position: absolute;
          inset: 0;
          z-index: 0;
        }

        .orbit-cw {
          animation: rotateCW 18s linear infinite;
          transform-origin: center;
        }

        .orbit-ccw {
          animation: rotateCCW 28s linear infinite;
          transform-origin: center;
        }

        @keyframes drift {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 1; }
        }

        @keyframes scanline {
          0% { top: -10%; }
          100% { top: 110%; }
        }

        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(0,229,255,0.15); }
          50% { box-shadow: 0 0 0 8px rgba(0,229,255,0.05); }
        }

        @keyframes hudFlicker {
          0%, 91%, 95%, 100% { opacity: 1; }
          93% { opacity: 0.4; }
        }

        @keyframes rotateCW {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes rotateCCW {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(-360deg); }
        }
      `}</style>
    </div>
  );
}
