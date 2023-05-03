/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "375px",
      iphone12: { min: "390px", max: "391px" },
      ...defaultTheme.screens,
    },
    extend: {
      backgroundImage: {
        background: "url('../src/assets/bgImage.png')",
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#61d7dd",

          secondary: "#2398c6",

          accent: "#99bc38",

          neutral: "#1F2428",

          "base-100": "#ECECF3",

          info: "#A0C3E4",

          success: "#1AD163",

          warning: "#FCBD36",

          error: "#F35E68",
          blue: "#0000FF",
          yellow: "#facc15",
        },
      },
      "corporate",
    ],
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
