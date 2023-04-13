import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    proxy: {
      "/api": "http://localhost:3001/",
    },
  },
  plugins: [react({ jsxRuntime: "classic" })],
  define: {
    "process.env": {
      API_URL: JSON.stringify(process.env.API_URL),
    },
  },
});
