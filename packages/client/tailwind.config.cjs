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
      keyframes: {
        spin: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
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
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
    ],
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
