import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (/node_modules[\\/](gsap|@gsap|lenis)/.test(id)) return "motion";
          if (/node_modules[\\/]howler/.test(id)) return "audio";
        },
      },
    },
  },
});
