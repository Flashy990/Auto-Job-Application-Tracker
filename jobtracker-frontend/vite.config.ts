import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  server: {
    port: 3000,
    proxy: {
      '/api': 'http://localhost:8080'
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-core': ['react', 'react-dom'],
          'router': ['@react-router/node', '@react-router/serve', 'react-router', '@react-router/dev', 'react-router-devtools'],
          'redux': ['@reduxjs/toolkit', 'react-redux'],
          'ui-components': ['react-hot-toast', 'isbot'],
          'network': ['axios'],
          'styling': ['tailwindcss', '@tailwindcss/vite'],
          'dev-tools': [
            '@types/node', 
            '@types/react', 
            '@types/react-dom', 
            'typescript', 
            'vite-tsconfig-paths']
        }
      }
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router', '@reduxjs/toolkit', 'react-redux', 'axios'],
  }
});
