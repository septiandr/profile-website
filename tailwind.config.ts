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
        paper: {
          50: "#ffffff",
          100: "#faf9f6",
          200: "#f4f1ea",
          300: "#eae5d9",
        },
        electric: {
          blue: "#2563eb",
          cyan: "#06b6d4",
          lime: "#84cc16",
          purple: "#7c3aed",
          coral: "#f97316",
          rose: "#e11d48",
          amber: "#f59e0b",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Syne", "sans-serif"],
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "Inter", "sans-serif"],
        serif: ["var(--font-serif)", "Playfair Display", "serif"],
        mono: ["var(--font-sans)", "Plus Jakarta Sans", "sans-serif"],
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
