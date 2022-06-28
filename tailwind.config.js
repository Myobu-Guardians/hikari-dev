/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        assasin: ["Assassin Ninja", "sans-serif"],
      },
      keyframes: {
        zoom: {
          "0%": {
            transform: "scale(0.6)",
          },
          "50%": {
            transform: "scale(0.8)",
          },
          "100%": {
            transform: "scale(0.6)",
          },
        },
      },
      animation: {
        zoom: "zoom 2s ease-in-out infinite",
      },
    },
  },
  daisyui: {
    themes: ["coffee"],
  },
  plugins: [require("daisyui")],
};
