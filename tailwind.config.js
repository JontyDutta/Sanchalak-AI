/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // enable dark mode class
  theme: {
    extend: {
      colors: {
        fifa: {
          red: '#E31B23',
          dark: '#0B0F19',
          card: '#1A2235',
          gold: '#F4C01E',
          accent: '#2563EB',
          success: '#10B981',
          warning: '#F59E0B',
          danger: '#EF4444'
        }
      },
    },
  },
  plugins: [],
}
