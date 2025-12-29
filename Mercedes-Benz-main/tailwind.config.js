/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#0A0A0A',
        silver: '#C0C0C0',
      },
      fontFamily: {
        serif: ['Corporate A BQ Light', 'Cormorant Garamond', 'serif'],
        sans: ['Corporate A BQ Light', 'Inter', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

