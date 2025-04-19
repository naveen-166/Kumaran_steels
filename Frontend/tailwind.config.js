const withMT = require("@material-tailwind/react/utils/withMT");


/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      oswald: ['Oswald', 'sans-serif'],
      edu: ['Edu AU VIC WA NT Hand'],
      Courgette: ['Courgette'],
      Kanit: ['Kanit'],

    },
  },
  plugins: [],
})