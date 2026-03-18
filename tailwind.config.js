/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          50: '#f8f8f8',
          100: '#eeeeee',
          200: '#dcdcdc',
          280: '#c8c8c8',
          300: '#bebebe',
          350: '#b8b8b8',
          400: '#a8a8a8',
          500: '#909090',
          600: '#808080',
          700: '#707070',
          800: '#505050',
          900: '#303030',
        },
      },
    },
  },
  plugins: [],
}

