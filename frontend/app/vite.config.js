import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit()],
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()],
    },
  },
};

export default config;
