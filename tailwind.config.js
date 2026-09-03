/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#F0EFEA",
        ink: "#16233D",
        board: "#1F3D33",
        boardLight: "#2C5245",
        gold: "#C9A227",
        correct: "#2F7A5C",
        wrong: "#B84C3E",
        line: "#D8D4C8",
      },
      fontFamily: {
        sans: ["Vazirmatn", "Tahoma", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      borderRadius: {
        sheet: "3px",
      },
    },
  },
  plugins: [],
};
