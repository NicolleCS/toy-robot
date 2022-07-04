/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'Roboto, sans-serif',
      },
      borderWidth: {
        9: '1.0rem',
      },
      colors: {
        brown: {
          500: '#59292C'
        },
        yellow : {
          800: '#EFC319'
        }
      },
    },
  },
  plugins: [],
}
