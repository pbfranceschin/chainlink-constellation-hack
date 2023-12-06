/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      maxHeight: {
        '0.5full': '50%', 
        '0.5screen': '50vh', 
        '0.45screen': '45vh', 
      },
      height: {
        '0.5screen': '50vh',
      },
      width: {
        '0.5full': '50%',
      },
      padding: {
        '0.5full': '30%'
      },
      spacing: {
        '7px': '7px',
        '8px': '8px',
        '9px': '9px',
        '11px': '11px'
      }
    },
  },
  plugins: [],
  darkMode: false, // disables dark mode entirely
}
