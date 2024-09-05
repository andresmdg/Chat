/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      "light-green": "#BCF8CB",
      "light-yellow": "#FFF09C",
      "blue": {
        400: "#60a5fa",
        600: "#2563eb"
      },
      "zinc": {
        700: "#3f3f46",
      },
      "yellow": {
        50: "#fefce8"
      },
      "violet": {
        300: "#9379C2",
        500: "#8b5cf6",
      },
      "red": {
        400: "#f87171"
      },
      "green": {
        500: "#22c55e",
        600: "#16a34a"
      },
      "slate": {
        50: "#f8fafc"
      },
      "white": "#ffffff",
    }
  },
  plugins: [],
}

