/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'sm': '359px',
        'xs': '390px',
        'xsm': '394px',
        'md': '768px',
        'lg': '1366px',
        'xl': '1536px'
      }
    },
  },
  plugins: [],
}

