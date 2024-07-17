// /** @type {import('tailwindcss').Config} */
// const defaultTheme = require("tailwindcss/defaultTheme");

// module.exports = {
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     screens: {
//       xs: "375px",
//       iphone12: { min: "390px", max: "391px" },
//       ...defaultTheme.screens,
//     },
//     extend: {
//       backgroundImage: {
//         background: "url('../src/assets/bgImage.png')",
//       },
//       keyframes: {
//         spin: {
//           from: { transform: "rotate(0deg)" },
//           to: { transform: "rotate(360deg)" },
//         },
//       },
//       animation: {
//         "spin-slow": "spin 3s linear infinite",
//       },
//     },
//   },
//   daisyui: {
//     themes: [
//       {
//         mytheme: {
//           primary: "#1a6791",

//           secondary: "#f9b7b1",

//           accent: "#db04ea",

//           neutral: "#2d2e39",

//           "base-100": "#2b3e5a",

//           info: "#4094dd",

//           success: "#31c495",

//           warning: "#f7b269",

//           error: "#e44444",
//         },
//       },
//       "light",
//       "dark",
//       "cupcake",
//       "bumblebee",
//       "emerald",
//       "corporate",
//       "synthwave",
//       "retro",
//       "cyberpunk",
//       "valentine",
//       "halloween",
//       "garden",
//       "forest",
//       "aqua",
//       "lofi",
//       "pastel",
//       "fantasy",
//       "wireframe",
//       "black",
//       "luxury",
//       "dracula",
//       "cmyk",
//       "autumn",
//       "business",
//       "acid",
//       "lemonade",
//       "night",
//       "coffee",
//       "winter",
//     ],
//   },
//   plugins: [require("@tailwindcss/typography"), require("daisyui")],
// };

const fontFamily = require("tailwindcss/defaultTheme").fontFamily;
/** @type {import { fontFamily } from "tailwindcss/defaultTheme"}; */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["var(--font-heading)", ...fontFamily.sans],
        body: ["var(--font-body)", ...fontFamily.sans],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#4a90e2", // A fresh, modern blue
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#50e3c2", // A vibrant teal
          foreground: "#ffffff",
        },
        destructive: {
          DEFAULT: "#e94e77", // A strong, eye-catching pink
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#b0bec5", // A soft, neutral gray
          foreground: "#ffffff",
        },
        accent: {
          DEFAULT: "#f5a623", // A warm, inviting orange
          foreground: "#ffffff",
        },
        popover: {
          DEFAULT: "#ffffff",
          foreground: "#333333",
        },
        card: {
          DEFAULT: "#f7fafc",
          foreground: "#333333",
        },
      },
      white: "#ffffff",
      gray: {
        100: "#f7fafc",
        200: "#edf2f7",
        300: "#e2e8f0",
        400: "#cbd5e0",
        500: "#a0aec0",
        600: "#718096",
        700: "#4a5568",
        800: "#2d3748",
        900: "#1a202c",
      },
      blue: {
        100: "#ebf8ff",
        200: "#bee3f8",
        300: "#90cdf4",
        400: "#63b3ed",
        500: "#4299e1",
        600: "#3182ce",
        700: "#2b6cb0",
        800: "#2c5282",
        900: "#2a4365",
      },
      borderRadius: {
        xl: `calc(var(--radius) + 4px)`,
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: `calc(var(--radius) - 4px)`,
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      outline: {
        accent: "2px solid #f5a623",
        primary: "2px solid #4a90e2",
        secondary: "2px solid #50e3c2",
        destructive: "2px solid #e94e77",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    require("daisyui"),
  ],
};
