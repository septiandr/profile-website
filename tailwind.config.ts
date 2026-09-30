import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/journey/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: "#070811",
          900: "#0b0e1b",
          850: "#101426",
          800: "#151b30",
          700: "#222a4d",
        },
        astral: {
          void: "#070811",
          deep: "#0a0d1e",
          card: "#0e1224",
          surface: "#141932",
        },
        solar: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
        },
        champagne: {
          100: "#fdfbf7",
          200: "#f9f4ea",
          300: "#f3e8d2",
          400: "#ebd8b6",
          500: "#dfc495",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Syne", "sans-serif"],
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "Inter", "sans-serif"],
        serif: ["var(--font-serif)", "Playfair Display", "serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 25s linear infinite",
        float: "float 6s ease-in-out infinite",
        marquee: "marquee 35s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      boxShadow: {
        "glow-solar": "0 0 25px rgba(245, 158, 11, 0.35)",
        "glow-amber": "0 0 35px rgba(251, 191, 36, 0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
