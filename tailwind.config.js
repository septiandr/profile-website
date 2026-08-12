/**** Tailwind Config ****/
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: "#e52521",
        accent: "#fbd000",
        retroDark: "#1c1c3c",
        retroSky: "#5c94fc",
        retroGreen: "#3aa43a",
      },
      boxShadow: {
        pixel: "4px 4px 0 rgba(28,28,60,.85)",
        "pixel-lg": "8px 8px 0 rgba(28,28,60,.85)",
      },
    },
  },
  plugins: [],
};
