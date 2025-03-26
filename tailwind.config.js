/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#80726894", // Светло-темный бежевый
        secondary: "#2B1D0E", // Тёмный кофейный (для текста)
        light: {
          100: "#F5E8D9",
          200: "#E3C6A5",
          300: "#B8A899",
        },
        dark: {
          100: "#4A3F35",
          200: "#2B1D0E",
        },
        accent: "#C4A484",
      },
    },
  },
  plugins: [],
};
