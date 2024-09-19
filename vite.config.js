import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "build"
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "assets": path.resolve(__dirname, "src/assets"),
      "components": path.resolve(__dirname, "src/components"),
      "context": path.resolve(__dirname, "src/context"),
      "examples": path.resolve(__dirname, "src/examples"),
      "layouts": path.resolve(__dirname, "src/layouts")
    }
  }
});
