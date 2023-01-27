import adapter from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';

const locales = ['de', 'en'];
const ssgPaths = ['privacy'];

const localizedPath = (path) => locales.map((locale) => `/${locale}/${path}`);
const prerenderEntries = ssgPaths.map((path) => localizedPath(path)).flat();

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: preprocess(),
  kit: {
    adapter: adapter({
      precompress: true,
    }),
    alias: {
      $lib: 'src/lib',
      '$lib/*': 'src/lib/*',
      $i18n: 'src/lib/i18n',
      '~': 'src',
    },
    prerender: {
      entries: prerenderEntries,
    },
  },
};

export default config;
