/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      height: {
        '0.5screen': '50vh',
      },
      maxHeight: {
        '0.5full': '50%', 
        '0.5screen': '50vh', 
        '0.45screen': '45vh', 
      },
      minWidth: {
        '0.5full': '50%',
      },
      width: {
        '0.5full': '50%',
        '0.7full': '70%',
      },
      maxWidth: {
        '0.5full': '50%',
      },
      padding: {
        '0.5full': '30%'
      },
      spacing: {
        '2px': '2px',
        '72px':'72px'
      }
    },
  },
  plugins: [],
  darkMode: false, // disables dark mode entirely
}
