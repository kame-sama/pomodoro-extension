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
        content: resolve(__dirname, 'content.ts'),
      },
      output: {
        dir: join(__dirname, './dist'),
        assetFileNames: 'assets/[hash][extname]',
        chunkFileNames: 'assets/[hash].js',
        entryFileNames(chunkInfo) {
          if (chunkInfo.name === 'background' || chunkInfo.name === 'content') {
            return '[name].js';
          } else {
            return '[hash].js';
          }
        },
      },
    },
  },
});
