/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#F7F4EE",
        beige: "#EDE6D8",
        sage: "#8A9A80",
        gold: "#C9A96E",
        charcoal: "#2E2A26",
      },
      fontFamily: {
        display: ["'Cormorant Garamond'", "serif"],
        body: ["'Jost'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
