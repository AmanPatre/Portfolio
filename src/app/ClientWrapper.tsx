"use client";
import { useState, useEffect } from "react";
import SplashScreen from "@/components/SplashScreen";
import GlassCursor from "@/components/GlassCursor";
import dynamic from "next/dynamic";

const SpaceBackground = dynamic(() => import("@/components/SpaceBackground"), { ssr: false });

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [splashDone, setSplashDone] = useState(false);
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    const already = sessionStorage.getItem("splash_shown");
    if (!already) {
      setShowSplash(true);
      sessionStorage.setItem("splash_shown", "1");
    } else {
      setSplashDone(true);
    }
  }, []);

  return (
    <>
      <SpaceBackground />
      <GlassCursor />
      {showSplash && !splashDone && (
        <SplashScreen onComplete={() => setSplashDone(true)} />
      )}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          opacity: splashDone || !showSplash ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
      >
        {children}
      </div>
    </>
  );
}
