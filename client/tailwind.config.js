/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: ['even'],
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'roboto':  ['Roboto', 'sans-serif'],
        'Orbitron':['Orbitron', 'sans-serif'],
        'Tinos':['Tinos', 'serif']
      },
    },
  },
  plugins: [],
}