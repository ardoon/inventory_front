/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        irsans: ['irsans'],
        rudaw: ['rudaw']
      },
      fontSize: {
        tiny: ['0.775rem', '1.15rem']
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
