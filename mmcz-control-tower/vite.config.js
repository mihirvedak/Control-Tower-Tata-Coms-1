import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: './' makes the build work from any folder or sub-path (Netlify, Vercel, GitHub Pages, IIS, Apache, Nginx).
export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    allowedHosts: ['arango-ui.iocompute.ai'],
  },
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 1200,
  },
});
