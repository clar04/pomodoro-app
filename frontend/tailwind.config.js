/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        'black-wash': '#0d0d0d', 
        'murrey': '#7a2246',     
        'light-coral': '#f2858e',

        // Heatmap colors
        'graphLow': '#1a1a1a', // Darker base for heatmap empty
        'graphMedium': '#7a2246', // Murrey for medium
        'graphHigh': '#f2858e', // Light Coral for high
        'graphVeryHigh': '#ff6b77', // Slightly brighter highlight for very high
      },
      backgroundImage: {
        'gradient-murrey-coral': 'linear-gradient(to right, var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
};
