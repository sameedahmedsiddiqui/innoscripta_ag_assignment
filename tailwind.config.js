/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '320px',
        ...defaultTheme.screens,

        'mx-2xl': {'max': '1535px'},

        'mx-xl': {'max': '1279px'},

        'mx-lg': {'max': '1023px'},

        'mx-md': {'max': '767px'},

        'mx-sm': {'max': '639px'},
      }
    },
  },
  plugins: [],
}

