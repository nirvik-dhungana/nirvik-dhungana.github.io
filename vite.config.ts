import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import viteCompression from "vite-plugin-compression";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      viteCompression({ algorithm: "gzip" }),
      viteCompression({ algorithm: "brotliCompress", ext: ".br" }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "."),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify — file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== "true",
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === "true" ? null : {},
    },
    css: {
      devSourcemap: false,
    },
    build: {
      minify: "esbuild",
      cssMinify: true,
      target: "es2020",
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes("node_modules")) return;
            // Consolidate React + its ecosystem into a single vendor-react
            // chunk. Splitting them across separate chunks (react-vendor,
            // router-vendor, motion-vendor, lucide-vendor) creates circular
            // chunk dependencies that break rendering in production builds.
            if (
              id.includes("node_modules/react/") ||
              id.includes("node_modules/react-dom/") ||
              id.includes("node_modules/scheduler/") ||
              id.includes("node_modules/react-router") ||
              id.includes("node_modules/motion") ||
              id.includes("node_modules/framer-motion") ||
              id.includes("node_modules/lucide-react")
            ) {
              return "vendor-react";
            }
            return "vendor";
          },
        },
      },
    },
    esbuild: {
      // Strip unused lucide-react icon imports at build time (tree-shaking hint).
      legalComments: "none",
    },
  };
});
