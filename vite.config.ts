import { defineConfig } from 'vite';
import { resolve, join } from 'path';

export default defineConfig({
  build: {
    sourcemap: true,
    target: 'esnext',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'popup.html'),
        settings: resolve(__dirname, 'settings.html'),
        background: resolve(__dirname, 'background.ts'),
      },
      output: {
        dir: join(__dirname, './dist'),
        entryFileNames(chunkInfo) {
          if (chunkInfo.name === 'background') {
            return 'background.js';
          } else {
            return '[name][hash].js';
          }
        },
      },
    },
  },
});
