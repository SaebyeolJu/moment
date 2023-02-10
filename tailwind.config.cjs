/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./src/*.tsx",
    "./src/pages/*.tsx",
    "./src/components/*.tsx",
    "./src/functions/*.tsx",
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },

    fontFamily: {
      sans: ["Roboto", "sans-serif"],
      serif: ["Roboto Slab", "serif"],
    },

    extend: {
      colors: {
        white: "#EAEDDF",
        "light-gray": "#E5E5E5",
        gray: "#ACB3BF",
        black: "#1E1E1E",
        "light-yellow": "#FCD585",
        "dark-yellow": "#F0B156",
        "light-brown": "#E8CDAF",
        brown: "#9A6826",
        "dark-brown": "#6C3B0E",
        "light-green": "#ACB",
        "dark-green": "#335342",
        "dark-purple": "#081A51",
        "light-white": "rgba(255,255,255,0.18)",
      },
    },
  },
  plugins: [],
};
