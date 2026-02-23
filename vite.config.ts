import { defineConfig } from "vite";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    // The React and Tailwind plugins are both required
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      "@": path.resolve(__dirname, "./src"),
    },
  },

  // File types to support raw imports
  assetsInclude: ["**/*.svg", "**/*.csv"],

  // Pre-optimize heavy dependencies to reduce unnecessary reloads
  optimizeDeps: {
    include: [
      "react-dom/client",
      "motion/react",
      "lucide-react",
      "react-google-recaptcha",
      "react-toastify",
      "react-redux",
      "@reduxjs/toolkit",
      "axios",
      "clsx",
      "tailwind-merge",
    ],
  },

  // Optional: ignore unnecessary files during dev watch to reduce reloads
  server: {
    watch: {
      ignored: ["!**/node_modules/**"],
    },
  },
});
