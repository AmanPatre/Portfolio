"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import * as THREE from "three";

interface ProfileSphereProps {
  photoSrc?: string;
  photoAlt?: string;
}

export default function ProfileSphere({ photoSrc, photoAlt = "Aman Patre" }: ProfileSphereProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const W = mount.clientWidth;
    const H = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 1000);
    camera.position.z = 4.8;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // ── Helper: torus ring ──
    const makeTorus = (
      radius: number, tube: number, color: number,
      opacity: number, rotX: number, rotZ: number, segs = 180
    ) => {
      const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity });
      const mesh = new THREE.Mesh(new THREE.TorusGeometry(radius, tube, 2, segs), mat);
      mesh.rotation.x = rotX;
      mesh.rotation.z = rotZ;
      return mesh;
    };

    // ── Rings — varied colors, thicknesses, angles ──
    const ring1 = makeTorus(1.35, 0.007, 0x00e5ff, 0.9,  0,              0);             // equatorial — bright cyan
    const ring2 = makeTorus(1.35, 0.005, 0x00aaff, 0.65, Math.PI / 2,    0);             // polar — mid blue
    const ring3 = makeTorus(1.35, 0.004, 0x0066ff, 0.50, Math.PI / 3.5,  Math.PI / 5);  // diagonal A
    const ring4 = makeTorus(1.35, 0.004, 0x0088dd, 0.45, -Math.PI / 3.5, Math.PI / 3);  // diagonal B
    const ring5 = makeTorus(1.6,  0.003, 0x00d2ff, 0.25, Math.PI / 6,    0);             // outer halo
    const ring6 = makeTorus(1.0,  0.005, 0x00ffee, 0.30, Math.PI / 2.5,  Math.PI / 4);  // inner teal ring
    const ring7 = makeTorus(1.55, 0.002, 0x4444ff, 0.20, -Math.PI / 5,   Math.PI / 7);  // subtle outer purple

    masterGroup.add(ring1, ring2, ring3, ring4, ring5, ring6, ring7);

    // ── Inner wireframe icosahedron ──
    const wfGeo = new THREE.IcosahedronGeometry(0.85, 2);
    const wfMat = new THREE.MeshBasicMaterial({ color: 0x0055ff, wireframe: true, transparent: true, opacity: 0.14 });
    const wf = new THREE.Mesh(wfGeo, wfMat);
    masterGroup.add(wf);

    // ── Surface particles ──
    const pGeo = new THREE.BufferGeometry();
    const pCount = 900;
    const pPos: number[] = [];
    for (let i = 0; i < pCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / pCount);
      const theta = Math.sqrt(pCount * Math.PI) * phi;
      const r = 1.35;
      pPos.push(r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta));
    }
    pGeo.setAttribute("position", new THREE.Float32BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({ color: 0x00d2ff, size: 0.018, transparent: true, opacity: 0.5 });
    masterGroup.add(new THREE.Points(pGeo, pMat));

    // ── Orbital nodes — glowing spheres ──
    const makeNode = (r: number, color: number, size = 0.04) => {
      const mat = new THREE.MeshBasicMaterial({ color });
      return new THREE.Mesh(new THREE.SphereGeometry(size, 12, 12), mat);
    };
    // Equatorial nodes
    const n1 = makeNode(1.35, 0x00ffff, 0.045);
    const n2 = makeNode(1.35, 0x00aaff, 0.035);
    const n3 = makeNode(1.35, 0x00e5ff, 0.04);
    // Polar nodes
    const n4 = makeNode(1.35, 0x44ddff, 0.03);
    const n5 = makeNode(1.35, 0x0066ff, 0.038);
    masterGroup.add(n1, n2, n3, n4, n5);

    // ── Lights ──
    scene.add(new THREE.AmbientLight(0xffffff, 0.35));
    const dLight = new THREE.DirectionalLight(0x00d2ff, 1.4);
    dLight.position.set(5, 3, 5);
    scene.add(dLight);
    const rLight = new THREE.DirectionalLight(0x0033ff, 0.6);
    rLight.position.set(-5, -2, -4);
    scene.add(rLight);
    const pLight = new THREE.PointLight(0x00e5ff, 0.5, 8);
    pLight.position.set(0, 0, 3);
    scene.add(pLight);

    // ── Interaction ──
    let autoY = 0.0035;
    let isDragging = false;
    let prev = { x: 0, y: 0 };
    let tgtX = 0.2, tgtY = 0, curX = 0.2, curY = 0;

    const canvas = renderer.domElement;
    canvas.addEventListener("mousedown", (e) => { isDragging = true; prev = { x: e.clientX, y: e.clientY }; autoY = 0; });
    window.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      tgtY += (e.clientX - prev.x) * 0.005;
      tgtX += (e.clientY - prev.y) * 0.005;
      tgtX = Math.max(-1.0, Math.min(1.0, tgtX));
      prev = { x: e.clientX, y: e.clientY };
    });
    window.addEventListener("mouseup", () => { isDragging = false; autoY = 0.0035; });

    let animId: number;
    let t = 0;

    function animate() {
      animId = requestAnimationFrame(animate);
      t += 0.012;

      if (!isDragging) tgtY += autoY;
      curX += (tgtX - curX) * 0.07;
      curY += (tgtY - curY) * 0.07;

      masterGroup.rotation.x = curX;
      masterGroup.rotation.y = curY;

      // Individual ring spins
      ring1.rotation.z += 0.006;
      ring2.rotation.x += 0.004;
      ring3.rotation.x += 0.003;  ring3.rotation.z -= 0.002;
      ring4.rotation.z += 0.0035; ring4.rotation.x -= 0.0015;
      ring5.rotation.x -= 0.002;
      ring6.rotation.x += 0.007;  ring6.rotation.z += 0.004;
      ring7.rotation.z -= 0.003;
      wf.rotation.y += 0.006;     wf.rotation.x += 0.003;

      // Orbital node positions
      n1.position.set(1.35 * Math.cos(t * 0.9), 0, 1.35 * Math.sin(t * 0.9));
      n2.position.set(1.35 * Math.cos(t * 0.9 + 2.1), 0, 1.35 * Math.sin(t * 0.9 + 2.1));
      n3.position.set(1.35 * Math.cos(t * 0.9 + 4.2), 0, 1.35 * Math.sin(t * 0.9 + 4.2));
      n4.position.set(0, 1.35 * Math.cos(t * 0.65), 1.35 * Math.sin(t * 0.65));
      n5.position.set(0, 1.35 * Math.cos(t * 0.65 + Math.PI), 1.35 * Math.sin(t * 0.65 + Math.PI));

      renderer.render(scene, camera);
    }
    animate();

    function onResize() {
      if (!mount) return;
      const w = mount.clientWidth; const h = mount.clientHeight;
      camera.aspect = w / h; camera.updateProjectionMatrix(); renderer.setSize(w, h);
    }
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", () => {});
      window.removeEventListener("mouseup", () => {});
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "480px" }}>
      {/* Multi-layer ambient glow */}
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", width: "420px", height: "420px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,180,255,0.1) 0%, rgba(0,60,200,0.05) 50%, transparent 72%)", filter: "blur(30px)" }} />
        <div style={{ position: "absolute", width: "200px", height: "200px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,229,255,0.15) 0%, transparent 70%)", filter: "blur(20px)" }} />
      </div>

      {/* Three.js canvas */}
      <div ref={mountRef} style={{ position: "absolute", inset: 0, cursor: "grab", zIndex: 1 }} />

      {/* Spinning conic-gradient photo ring */}
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2, pointerEvents: "none" }}>
        <div className="ps-ring-spin">
          <div className="ps-photo-inner">
            {photoSrc ? (
              <Image src={photoSrc} alt={photoAlt} fill style={{ objectFit: "cover", borderRadius: "50%" }} />
            ) : (
              <span className="ps-initials">AP</span>
            )}
            {/* Glass glare */}
            <div className="ps-glare" />
          </div>
        </div>
      </div>

      {/* HUD corner brackets */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 3 }}>
        <line x1="12" y1="40" x2="12" y2="12" stroke="rgba(0,229,255,0.35)" strokeWidth="1.5" />
        <line x1="12" y1="12" x2="40" y2="12" stroke="rgba(0,229,255,0.35)" strokeWidth="1.5" />
        <line x1="calc(100% - 12px)" y1="40" x2="calc(100% - 12px)" y2="12" stroke="rgba(0,229,255,0.35)" strokeWidth="1.5" />
        <line x1="calc(100% - 12px)" y1="12" x2="calc(100% - 40px)" y2="12" stroke="rgba(0,229,255,0.35)" strokeWidth="1.5" />
        <line x1="12" y1="calc(100% - 40px)" x2="12" y2="calc(100% - 12px)" stroke="rgba(0,229,255,0.35)" strokeWidth="1.5" />
        <line x1="12" y1="calc(100% - 12px)" x2="40" y2="calc(100% - 12px)" stroke="rgba(0,229,255,0.35)" strokeWidth="1.5" />
        <line x1="calc(100% - 12px)" y1="calc(100% - 40px)" x2="calc(100% - 12px)" y2="calc(100% - 12px)" stroke="rgba(0,229,255,0.35)" strokeWidth="1.5" />
        <line x1="calc(100% - 12px)" y1="calc(100% - 12px)" x2="calc(100% - 40px)" y2="calc(100% - 12px)" stroke="rgba(0,229,255,0.35)" strokeWidth="1.5" />
      </svg>

      {/* HUD text overlays */}
      <div className="ps-hud ps-hud-tl">
        <span className="ps-hud-key">Stack</span>
        <span className="ps-hud-val">MERN</span>
      </div>
      <div className="ps-hud ps-hud-tr">
        <span className="ps-hud-key">Open to</span>
        <span className="ps-hud-val">SDE · Intern</span>
      </div>
      <div className="ps-hud ps-hud-bl">
        <span className="ps-hud-key">Based in</span>
        <span className="ps-hud-val">India 🇮🇳</span>
      </div>
      <div className="ps-hud ps-hud-br">
        <span className="ps-hud-key">College</span>
        <span className="ps-hud-val">VIT Bhopal</span>
      </div>

      {/* Status pill */}
      <div className="ps-status">
        <span className="ps-status-dot" />
        <span className="ps-status-txt">Available for Hire</span>
      </div>

      {/* Drag hint */}
      <div style={{ position: "absolute", bottom: "6px", left: "50%", transform: "translateX(-50%)", fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "var(--text-muted)", opacity: 0.3, zIndex: 5, pointerEvents: "none", letterSpacing: "0.1em" }}>
        DRAG TO ROTATE
      </div>

      <style jsx global>{`
        /* Spinning photo ring */
        .ps-ring-spin {
          width: 168px;
          height: 168px;
          border-radius: 50%;
          padding: 3px;
          background: conic-gradient(
            from 0deg,
            #00e5ff 0%,
            #0057ff 25%,
            transparent 45%,
            transparent 55%,
            #00e5ff 75%,
            #00d2ff 100%
          );
          animation: ps-spin 3s linear infinite;
          box-shadow: 0 0 40px rgba(0,229,255,0.3), 0 0 80px rgba(0,100,255,0.15);
        }
        .ps-photo-inner {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: #060d1a;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          animation: ps-spin-rev 3s linear infinite;
        }
        .ps-initials {
          font-size: 3rem;
          font-weight: 800;
          background: linear-gradient(135deg, #00e5ff 0%, #0057ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-family: var(--font-display, Inter, sans-serif);
        }
        .ps-glare {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 55%);
          pointer-events: none;
        }

        /* HUD readouts */
        .ps-hud {
          position: absolute;
          display: flex;
          flex-direction: column;
          z-index: 4;
          animation: ps-flicker 7s infinite;
        }
        .ps-hud-key {
          font-family: monospace;
          font-size: 8px;
          color: rgba(0,229,255,0.38);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        .ps-hud-val {
          font-family: monospace;
          font-size: 10px;
          font-weight: 700;
          color: rgba(0,229,255,0.75);
          letter-spacing: 0.06em;
        }
        .ps-hud-tl { top: 18px; left: 22px; }
        .ps-hud-tr { top: 18px; right: 22px; text-align: right; }
        .ps-hud-bl { bottom: 18px; left: 22px; }
        .ps-hud-br { bottom: 18px; right: 22px; text-align: right; }
        .ps-hud-ct { top: 18px; left: 50%; transform: translateX(-50%); text-align: center; }

        /* Status pill */
        .ps-status {
          position: absolute;
          bottom: 32px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(6,13,26,0.9);
          border: 1px solid rgba(0,229,255,0.22);
          border-radius: 20px;
          padding: 4px 12px;
          z-index: 4;
          white-space: nowrap;
          box-shadow: 0 0 12px rgba(0,229,255,0.08);
        }
        .ps-status-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #00e5ff;
          box-shadow: 0 0 8px #00e5ff;
          animation: ps-blink 2s step-end infinite;
          flex-shrink: 0;
        }
        .ps-status-txt {
          font-family: monospace;
          font-size: 9px;
          color: rgba(0,229,255,0.75);
          letter-spacing: 0.07em;
          text-transform: uppercase;
        }

        /* Keyframes */
        @keyframes ps-spin     { to { transform: rotate(360deg);  } }
        @keyframes ps-spin-rev { to { transform: rotate(-360deg); } }
        @keyframes ps-blink    { 0%,100%{opacity:1} 50%{opacity:0.2} }
        @keyframes ps-flicker  { 0%,90%,95%,100%{opacity:1} 92%{opacity:0.3} }
      `}</style>
    </div>
  );
}
