/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors:{
      black: '#000000',
      while: '#FFFFFF',
      bgclr: '#FAFAFA',
      custom: '#f7f7f7',
      btnbg: '#BCEC30',
      lightBlue: '#00C1FF',
      blackRgba: 'rgba(0, 0, 0, 0.54)',
      inputBorder:"#D0CECE"
    },
    extend: {
      
    },
  },
  plugins: [],
}

