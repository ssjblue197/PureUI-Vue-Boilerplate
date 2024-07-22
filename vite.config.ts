import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

import path from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import webfontDownload from 'vite-plugin-webfont-dl';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8080,
    host: 'localhost',
  },
  preview: {
    port: 3030,
  },
  base: '/',
  publicDir: 'public',
  cacheDir: 'node_modules/.vite',
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // treat all tags with a dash as custom elements
          isCustomElement: (tag: string) =>
            String(tag).startsWith('sl-'),
        },
      },
    }),
    viteStaticCopy({
      targets: [
        {
          src: 'node_modules/@shoelace-style/shoelace/dist/assets',
          dest: 'public',
        },
      ],
    }),
    webfontDownload([
      'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap',
      'https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap',
    ]),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
