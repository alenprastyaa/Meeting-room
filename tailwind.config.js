/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(90deg, rgba(24, 162, 186, 1) 0%, rgba(41, 99, 119, 1) 100%)',
      },
      container: {
        center: true,
        padding: "60px"
      },
      colors: {
        'custom-blue': 'rgba(61, 125, 143, 1)',
      },
    },
  },
  plugins: [],
}