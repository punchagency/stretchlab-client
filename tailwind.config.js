/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      screens: {
        phone: "320px",
        tablet: "768px",
        laptop: "1024px",
      },
      colors: {
        primary: {
          base: "#368591",
          secondary: "#E1EEF0",
          tertiary: "#79AACD",
        },
        grey: {
          2: "#98A2B3",
          3: "#D0D5DD",
          4: "#5B5772",
          5: "#667185",
        },
        accent: {
          base: "#ED3833",
        },
        dark: {
          1: "#16151A",
        },
      },
      fontSize: {
        big: "48px",
      },
      letterSpacing: {
        custom: "-0.04em",
        custom2: "-0.02em",
      },
    },
  },
  plugins: [],
};
