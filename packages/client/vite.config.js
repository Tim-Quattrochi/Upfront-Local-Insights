import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://upfront-local-server.onrender.com",
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
  build: {
    rollupOptions: {
      external: ["react-icons"],
    },
  },
});
