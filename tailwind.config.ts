import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#050a06",
        bg2: "#0a0f0b",
        accent: "#00ff88",
        accent2: "#00cc6a",
        accent3: "#39ff14",
        "text-muted": "#6b8f71",
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      animation: {
        blink: "blink 1s step-end infinite",
        float: "floatDrift linear infinite",
        "pulse-border": "pulseBorder 2s ease-in-out infinite",
        nebula: "nebulaDrift ease-in-out infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        pulseBorder: {
          "0%, 100%": { borderColor: "rgba(0,255,136,0.15)" },
          "50%": { borderColor: "rgba(0,255,136,0.5)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
