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
        "pale-gray": "C4C4C4",
        "light-gray": "#F7F7F7",
        "dark-gray": "#151720",
        "grayish": "FAFAFA",
        "green": "#BCEC30",
        "light-green": "#C6FF00",
        "blue": "#00C1FF",
        "gray": "#999999",
        "black": "#000000",
        "white": "#FFFFFF",
        "white-gray": "#D0CECE",
        "yellow": "#FFC700",
        "salmon": "#FF7E65",
        "purple": "#7D458C",
        "orange": "#F7A012",
        "blueDark": "#2491D2",
      },
    },
  },
  plugins: [],
};

