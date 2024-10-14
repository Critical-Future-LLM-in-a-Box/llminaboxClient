import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      "@": __dirname
    }
  },
  build: {
    rollupOptions: {
      input: {
        client: "index.html",
        assistant: "assistant/index.tsx"
      },
      output: {
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === "client") return "client.js";
          if (chunkInfo.name === "assistant") return "assistant.js";
        },
        assetFileNames: () => {
          return "assets/[name].[ext]";
        }
      }
    }
  }
});
