/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
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
        },
      },
      "corporate",
    ],
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
