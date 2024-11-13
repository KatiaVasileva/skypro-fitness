/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    fontFamily: {
      sans: ["Roboto", "sans-serif"],
    },
    extend: {
      colors: {
        gray: "#999999",
        "light-gray": "#F7F7F7",
        "dark-gray": "#151720",
        "grayish": "FAFAFA",
        "green": "#BCEC30",
        "light-green": "#C6FF00",
        "blue": "#00C1FF",
        "gray": "#999999",
        "black": "#000000",
        "while": "#FFFFFF",
        "bgclr": "#FAFAFA",
        "custom": "#f7f7f7",
        "btnbg": "#BCEC30",
        "lightBlue": "#00C1FF",
        "blackRgba": "rgba(0, 0, 0, 0.54)",
        "inputBorder": "#D0CECE",
      },
      backgroundImage: {
        yoga: "url('/img/yogapic.png')",
        yogamin: "url('/img/yogapicmin.png')",
      },
    },
  },
  plugins: [],
};

