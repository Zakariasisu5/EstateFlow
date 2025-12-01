import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Optimize for production builds
    rollupOptions: {
      output: {
        manualChunks: {
          // Split Leaflet into its own chunk for better caching
          leaflet: ['leaflet'],
        },
      },
    },
    // Increase chunk size warning limit for maps
    chunkSizeWarningLimit: 1000,
  },
}));
