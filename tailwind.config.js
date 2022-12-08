/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      spacing: {
        '1': '2px',
        '2': '6px',
        '3': '10px',
        '4': '12px',
      },
    },
  },
  plugins: [],
}
