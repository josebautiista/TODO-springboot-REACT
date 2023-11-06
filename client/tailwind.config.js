/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{jsx,js}", "./index.html"],
  theme: {
    extend: {
      colors: {
        "ripe-plum": {
          50: "#f5f6fa",
          100: "#eaebf4",
          200: "#cfd3e8",
          300: "#a5afd4",
          400: "#7585bb",
          500: "#5365a4",
          600: "#404e89",
          700: "#353f6f",
          800: "#2f385d",
          900: "#2b314f",
          950: "#121421",
        },
      },
      fontFamily: {
        sans: ["Graphik", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
        ".no-scrollbar": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
