import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
    proxy: {
      // In local dev, proxy all /api/* calls to the Spring Boot backend.
      // Vite strips the '/api' prefix before forwarding (rewrite below),
      // matching the same path-stripping that Nginx does in production.
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        // Strip '/api' prefix so the backend receives the original path
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
