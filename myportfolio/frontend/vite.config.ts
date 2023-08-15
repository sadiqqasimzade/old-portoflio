///<reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  cacheDir: './node_modules/.vite/portfolio',
  base: './',

  server: {
    port: 4200,
    host: 'localhost',
  },

  preview: {
    port: 4300,
    host: 'localhost',
  },

  plugins: [
    react(),
    viteTsConfigPaths({
      root: './',
    }),
  ],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [
  //    viteTsConfigPaths({
  //      root: './',
  //    }),
  //  ],
  // },
  build: {
    assetsDir: './dist',
    cssMinify: true,
    minify: true,
    outDir: './dist',
    rollupOptions: {
      output: {
        entryFileNames: 'js/main.min.js',
        assetFileNames: 'css/style.min.css',
        chunkFileNames: 'js/[name].[hash].js',
        minifyInternalExports: true,
      }
    },
    emptyOutDir: false
  },
  test: {
    globals: true,
    cache: {
      dir: './node_modules/.vitest',
    },
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
});
