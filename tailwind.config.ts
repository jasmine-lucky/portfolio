import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        warm: {
          bg: "#ECE3D5",
          card: "#F5F0E8",
          hero: "#FAF6F0",
          line: "#D9CCB8",
        },
        mint: {
          DEFAULT: "#7EBBB8",
          light: "#A8D5D3",
          dark: "#5E9E9B",
        },
        ink: {
          DEFAULT: "#1D1D1D",
          secondary: "#787878",
        },
        dark: {
          DEFAULT: "#131313",
          card: "#1A1A1A",
        },
        copper: "#C4956A",
      },
      fontFamily: {
        serif: ["var(--font-serif)"],
        sans: ["var(--font-sans)"],
        display: ["var(--font-display)"],
        ui: ["var(--font-ui)"],
      },
      animation: {
        "breathe": "breathe 2s ease-in-out infinite",
        "slide-right": "slideRight 0.3s ease-out",
        "fade-up": "fadeUp 0.5s ease-out",
        "pulse-glow": "pulseGlow 1.5s ease-in-out",
      },
      keyframes: {
        breathe: {
          "0%, 100%": { boxShadow: "0 0 8px rgba(126, 187, 184, 0.3)" },
          "50%": { boxShadow: "0 0 20px rgba(126, 187, 184, 0.6)" },
        },
        slideRight: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
