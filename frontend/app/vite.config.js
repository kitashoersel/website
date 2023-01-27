import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import { imagetools } from 'vite-imagetools';

export default defineConfig({
  plugins: [sveltekit(), imagetools()],
  server: { port: 3000 },
  preview: { port: 3000 },
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()],
    },
  },
});
// 1.97
