"use client";
import { useEffect, useRef, useState } from "react";
import { GLOBE_LABELS } from "@/lib/constants";
import { latLonToVec3 } from "@/lib/utils";
import * as THREE from "three";

export default function Globe3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [labelPositions, setLabelPositions] = useState<
    { name: string; x: number; y: number; visible: boolean; slug?: string; color?: string }[]
  >([]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const W = mount.clientWidth;
    const H = mount.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 1000);
    camera.position.z = 2.8;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Globe sphere
    const RADIUS = 1;

    // Wireframe globe
    const wfGeo = new THREE.IcosahedronGeometry(RADIUS, 3);
    const wfMat = new THREE.MeshBasicMaterial({
      color: 0x00d2ff,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const wireframe = new THREE.Mesh(wfGeo, wfMat);
    scene.add(wireframe);

    // Atmosphere
    const atmGeo = new THREE.SphereGeometry(RADIUS * 1.06, 64, 64);
    const atmMat = new THREE.MeshPhongMaterial({
      color: 0x00d2ff,
      transparent: true,
      opacity: 0.06,
      side: THREE.FrontSide,
    });
    const atmosphere = new THREE.Mesh(atmGeo, atmMat);
    scene.add(atmosphere);

    // Dot points on globe surface (city-like dots)
    const dotGeo = new THREE.BufferGeometry();
    const dotCount = 1200;
    const positions: number[] = [];
    for (let i = 0; i < dotCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / dotCount);
      const theta = Math.sqrt(dotCount * Math.PI) * phi;
      const x = RADIUS * 1.001 * Math.sin(phi) * Math.cos(theta);
      const y = RADIUS * 1.001 * Math.cos(phi);
      const z = RADIUS * 1.001 * Math.sin(phi) * Math.sin(theta);
      positions.push(x, y, z);
    }
    dotGeo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    const dotMat = new THREE.PointsMaterial({
      color: 0x00d2ff,
      size: 0.012,
      transparent: true,
      opacity: 0.5,
    });
    const dots = new THREE.Points(dotGeo, dotMat);
    scene.add(dots);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0x00d2ff, 0.8);
    dirLight.position.set(5, 3, 5);
    scene.add(dirLight);
    const rimLight = new THREE.DirectionalLight(0x0066ff, 0.3);
    rimLight.position.set(-5, -3, -5);
    scene.add(rimLight);

    // Rotation state
    const rot = { x: 0, y: 0 };
    let targetRot = { x: 0, y: 0 };
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };
    let autoRot = 0.003;

    // Mouse drag
    function onMouseDown(e: MouseEvent) {
      isDragging = true;
      prevMouse = { x: e.clientX, y: e.clientY };
      autoRot = 0;
    }
    function onMouseMove(e: MouseEvent) {
      if (!isDragging) return;
      const dx = e.clientX - prevMouse.x;
      const dy = e.clientY - prevMouse.y;
      targetRot.y += dx * 0.005;
      targetRot.x += dy * 0.005;
      targetRot.x = Math.max(-1.2, Math.min(1.2, targetRot.x));
      prevMouse = { x: e.clientX, y: e.clientY };
    }
    function onMouseUp() {
      isDragging = false;
      autoRot = 0.003;
    }

    // Touch drag
    function onTouchStart(e: TouchEvent) {
      isDragging = true;
      prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      autoRot = 0;
    }
    function onTouchMove(e: TouchEvent) {
      if (!isDragging) return;
      const dx = e.touches[0].clientX - prevMouse.x;
      const dy = e.touches[0].clientY - prevMouse.y;
      targetRot.y += dx * 0.005;
      targetRot.x += dy * 0.005;
      prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
    function onTouchEnd() {
      isDragging = false;
      autoRot = 0.003;
    }

    const canvas = renderer.domElement;
    canvas.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    // Label positions
    const labelWorldPositions = GLOBE_LABELS.map((l) => ({
      name: l.name,
      slug: l.slug,
      color: l.color,
      vec: latLonToVec3(l.lat, l.lon, RADIUS * 1.12),
    }));

    // Animation
    let animId: number;
    function animate() {
      animId = requestAnimationFrame(animate);

      if (!isDragging) targetRot.y += autoRot;

      rot.x += (targetRot.x - rot.x) * 0.08;
      rot.y += (targetRot.y - rot.y) * 0.08;

      wireframe.rotation.x = rot.x;
      wireframe.rotation.y = rot.y;
      atmosphere.rotation.x = rot.x;
      atmosphere.rotation.y = rot.y;
      dots.rotation.x = rot.x;
      dots.rotation.y = rot.y;

      // Update label HTML positions
      const newLabels = labelWorldPositions.map(({ name, slug, color, vec }) => {
        const rotatedVec = new THREE.Vector3(...vec)
          .applyEuler(new THREE.Euler(rot.x, rot.y, 0));

        const projected = rotatedVec.clone().project(camera);
        const x = ((projected.x + 1) / 2) * W;
        const y = ((-projected.y + 1) / 2) * H;
        const visible = rotatedVec.z > 0;

        return { name, slug, color, x, y, visible };
      });
      setLabelPositions(newLabels);

      renderer.render(scene, camera);
    }
    animate();

    // Resize
    function onResize() {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      canvas.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", minHeight: "420px" }}>
      {/* Emerald glow behind globe */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        <div
          style={{
            width: "340px",
            height: "340px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(0,210,255,0.12) 0%, rgba(0,210,255,0.04) 50%, transparent 70%)",
            filter: "blur(20px)",
          }}
        />
      </div>

      {/* Three.js canvas */}
      <div
        ref={mountRef}
        style={{
          position: "absolute",
          inset: 0,
          cursor: "grab",
          zIndex: 1,
        }}
      />

      {/* Skill labels */}
      {labelPositions.map((l) => (
        <div
          key={l.name}
          className="globe-label"
          style={{
            position: "absolute",
            left: l.x,
            top: l.y,
            transform: "translate(-50%, -50%)",
            opacity: l.visible ? 1 : 0,
            zIndex: 2,
            transition: "opacity 0.3s ease",
            pointerEvents: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.35rem",
            filter: l.visible ? "drop-shadow(0 0 10px rgba(0,210,255,0.25))" : "none",
          }}
        >
          {l.slug ? (
            <img
              src={`https://cdn.simpleicons.org/${l.slug}${l.color ? `/${l.color}` : ""}`}
              alt={l.name}
              style={{ width: "36px", height: "36px" }}
            />
          ) : (
            <span className="dot" />
          )}
          <span style={{
            fontSize: "0.58rem",
            fontFamily: "var(--font-mono)",
            fontWeight: 500,
            color: "var(--text-muted)",
            background: "rgba(6,10,15,0.85)",
            border: "1px solid rgba(255,255,255,0.07)",
            padding: "1px 6px",
            borderRadius: "4px",
            whiteSpace: "nowrap",
          }}>{l.name}</span>
        </div>
      ))}

      {/* Drag hint */}
      <div
        style={{
          position: "absolute",
          bottom: "8px",
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "var(--font-mono)",
          fontSize: "0.6rem",
          color: "var(--text-muted)",
          opacity: 0.5,
          zIndex: 3,
          pointerEvents: "none",
        }}
      >
        drag to rotate
      </div>
    </div>
  );
}
