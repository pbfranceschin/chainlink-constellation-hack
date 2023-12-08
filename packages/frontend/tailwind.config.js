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
        '0.4full': '44%',
      },
      maxWidth: {
        '0.5full': '50%',
        '0.4full': '40%',
      },
      padding: {
        '0.5full': '30%'
      },
      spacing: {
        '2px': '2px',
        '72px':'72px'
      },
      colors: {
        background1: '#333333',
        background2: '#202020',
        background3: '#474747',
        background4: '#666666',
        text1: '#F5F5F5',
        text2: '#D8D7D8',
        text3: '#585858',
        text4: '#ADADAD',
        primary: '#129490',
        secondary: '#D65780'
      }
    },
  },
  plugins: [],
  darkMode: false, // disables dark mode entirely
}
