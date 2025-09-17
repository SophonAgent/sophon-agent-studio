import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';

const TARGET_ENV = 'http://10.37.19.225:8080';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/paas',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    manifest: true,
    outDir: 'dist',
  },
  server: {
    port: 3000,
    proxy: {
      '/api/v1': {
        target: TARGET_ENV,
        changeOrigin: true,
      },
      '/mcp/wrapper': {
        target: TARGET_ENV,
        changeOrigin: true,
      },
    },
  },
});
