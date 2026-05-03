"use client";
import { useEffect, useRef } from "react";

export default function GlassCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailsRef = useRef<HTMLDivElement[]>([]);
  const posRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const NUM_TRAILS = 8;
    const trails: { el: HTMLDivElement; x: number; y: number }[] = [];

    for (let i = 0; i < NUM_TRAILS; i++) {
      const el = document.createElement("div");
      el.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: rgba(0,210,255,${0.6 - i * 0.06});
        border-radius: 50%;
        pointer-events: none;
        z-index: 9990;
        transform: translate(-50%,-50%);
        transition: opacity 0.1s;
      `;
      document.body.appendChild(el);
      trailsRef.current[i] = el;
      trails.push({ el, x: -100, y: -100 });
    }

    let raf: number;
    const positions: { x: number; y: number }[] = Array(NUM_TRAILS).fill({ x: -100, y: -100 });

    function onMove(e: MouseEvent) {
      posRef.current = { x: e.clientX, y: e.clientY };
    }

    function animate() {
      const head = posRef.current;

      // Update cursor box
      if (cursor) {
        cursor.style.left = head.x + "px";
        cursor.style.top = head.y + "px";
      }

      // Trail follows with delay
      positions.unshift({ x: head.x, y: head.y });
      positions.pop();

      trails.forEach((t, i) => {
        const pos = positions[Math.min(i * 2, positions.length - 1)];
        t.el.style.left = pos.x + "px";
        t.el.style.top = pos.y + "px";
      });

      raf = requestAnimationFrame(animate);
    }

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      trails.forEach((t) => t.el.remove());
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{
        position: "fixed",
        width: "10px",
        height: "10px",
        background: "var(--accent)",
        borderRadius: "1px",
        pointerEvents: "none",
        zIndex: 9991,
        transform: "translate(-50%, -50%)",
        boxShadow: "0 0 8px var(--accent)",
        transition: "transform 0.05s ease",
      }}
    />
  );
}
