import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  mode: "production",
  plugins: [react({ jsxRuntime: "classic" })],
});
