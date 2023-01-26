import adapter from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';

const locales = ['de', 'en'];
const ssgPaths = ['', 'test'];

const localizedPath = (path) => locales.map((locale) => `/${locale}/${path}`);
const prerenderEntries = ssgPaths.map((path) => localizedPath(path)).flat();

console.log(prerenderEntries);

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: preprocess(),
  kit: {
    adapter: adapter(),
    alias: {
      '~': 'src',
      $i18n: 'src/i18n',
    },
    prerender: {
      entries: prerenderEntries,
    },
  },
};

export default config;
