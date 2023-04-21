/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./src/*.tsx",
    "./src/pages/**/*.tsx",
    "./src/components/**/*.tsx",
    "./src/functions/*.tsx",
  ],
  theme: {
    extend: {
      screens: {
        sm: "480px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },

      inset: {
        "1/5": "20%",
        "1/6": "16.666667%",
        "1/7": "14.285714%",
      },

      fontFamily: {
        sans: ["Roboto", "sans-serif"],
        serif: ["Roboto Slab", "serif"],
      },
      dropShadow: {
        "3xl": "0 35px 35px rgba(0, 0, 0, 0.25)",
        "4xl": [
          "0 35px 35px rgba(0, 0, 0, 0.25)",
          "0 45px 65px rgba(0, 0, 0, 0.15)",
        ],
      },
      colors: {
        ivory: "#EAEDDF",
        "light-gray": "#E5E5E5",
        "dark-gray": "#212121",
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
        "dark-indigo": "#050331",
        "dark-blue": "#1a202c",
      },
    },
  },
  plugins: [],
};
