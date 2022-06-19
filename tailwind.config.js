/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        assasin: ["Assassin Ninja", "sans-serif"],
      },
    },
  },
  daisyui: {
    themes: ["coffee"],
  },
  plugins: [require("daisyui")],
};
