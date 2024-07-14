import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target:
          process.env.VITE_NODE_ENV === "production"
            ? "https://upfront-local-server.onrender.com"
            : "http://localhost:3001",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  plugins: [react({ jsxRuntime: "classic" })],
  define: {
    "process.env": {
      API_URL: JSON.stringify(process.env.API_URL),
    },
  },
  resolve: {
    extensions: [".js", ".json", ".jsx"],
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/__tests__/setup.js",
  },
});
