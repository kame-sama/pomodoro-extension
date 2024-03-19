import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    target: 'esnext',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'popup.html'),
        settings: resolve(__dirname, 'settings.html'),
      },
    },
  },
});
