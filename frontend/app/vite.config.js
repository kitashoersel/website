import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { imagetools } from '@modules/svelte-image/vite';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  plugins: [sveltekit(), imagetools()],
  css: { postcss: { plugins: [tailwindcss(), autoprefixer()] } },
  server: { port: 3000 },
  preview: { port: 3000 },
});
