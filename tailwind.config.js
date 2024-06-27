/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        publicsans: ['Public Sans', 'sans-serif'],
        publicsansbold: ['Public Sans Bold', 'sans-serif'],
        publicsansblack: ['Public Sans Black', 'sans-serif'],
        sg: ['Space Grotesk', 'sans-serif'],
        sgb: ['Space Grotesk Bold', 'sans-serif'],
        sgmb: ['Space Grotesk Semi Bold', 'sans-serif']
      }
    },
  },
  plugins: [],
};