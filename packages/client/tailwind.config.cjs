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
          primary: "#1a6791",

          secondary: "#f9b7b1",

          accent: "#db04ea",

          neutral: "#2d2e39",

          "base-100": "#2b3e5a",

          info: "#4094dd",

          success: "#31c495",

          warning: "#f7b269",

          error: "#e44444",
        },
      },
    ],
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
