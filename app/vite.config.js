import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [react()],
    build: {
      outDir: 'dist',
      minify: true,
    },
    server: {
      watch: {
        usePolling: true,
        interval: 1000,
      },
      host: true,
      port: 5173,
    },
    resolve: {
      alias: {
        "@components": path.resolve(__dirname, 'src/components'),
        "@store": path.resolve(__dirname, 'src/store'),
        "@layouts": path.resolve(__dirname, 'src/layouts'),
        "@pages": path.resolve(__dirname, 'src/pages'),
        "@hooks": path.resolve(__dirname, 'src/hooks'),
        "@assets": path.resolve(__dirname, 'src/assets'),
        "@views": path.resolve(__dirname, 'src/views'),
        "@utils": path.resolve(__dirname, 'src/utils'),
      },
    },
  };
});
