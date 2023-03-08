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
          primary: "#09AF7B",

          secondary: "#6bbbe0",

          accent: "#ffccea",

          neutral: "#1D1A23",

          "base-100": "#167EBF",

          info: "#09AF7B",

          success: "#118866",

          warning: "#EC8609",

          error: "#E95744",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
