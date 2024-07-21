const fontFamily = require("tailwindcss/defaultTheme").fontFamily;
/** @type {import { fontFamily } from "tailwindcss/defaultTheme"}; */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  daisyui: {
    themes: ["light", "dark", "lofi", "dim", "nord"],
  },
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Trade Gothic Next Light"', ...fontFamily.sans],
        subheading: ['"Fira Sans Black"', ...fontFamily.sans],
        body: ['"Franklin Gothic Demi"', ...fontFamily.sans],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: "#00c0c9",
        secondary: "#b8dde1",
        tertiary: "#004e64",
        quaternary: "#d9d6d3",
        neutral: "#5e5e5e",
        muted: {
          DEFAULT: "#b0bec5",
          foreground: "#ffffff",
        },
        accent: {
          DEFAULT: "#f5a623",
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
        btn: {
          DEFAULT: "#00c0c9",
          foreground: "#ffffff",
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
      btn: {
        DEFAULT: "var(--radix-button-background-color)",
        foreground: "var(--radix-button-text-color)",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    require("daisyui"),
  ],
};
