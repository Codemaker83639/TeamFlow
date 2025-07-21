/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta de colores de TeamFlow
        'dark-purple': '#190019',
        'primary': '#2B124C',
        'secondary': '#522B5B',
        'accent': '#854F6C',
        'light-accent': '#DFB6B2',
        'light': '#FBE4D8',
      }
    },
  },
  plugins: [],
}