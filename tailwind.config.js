/**** Tailwind Config ****/
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00e5ff",
        accent: "#7c4dff",
      },
      boxShadow: {
        glow: "0 0 40px rgba(124,77,255,0.35)",
      },
    },
  },
  plugins: [],
};