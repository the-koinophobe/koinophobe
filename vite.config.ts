import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
  build: {
    target: "es2020",
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes("node_modules/react") || id.includes("node_modules/react-dom")) return "vendor-react";
          if (id.includes("node_modules/motion") || id.includes("node_modules/framer-motion")) return "vendor-motion";
          if (id.includes("node_modules/react-icons")) return "vendor-icons";
          if (id.includes("node_modules/gsap")) return "vendor-gsap";
        },
      },
    },
  },
  base: "/",
});
