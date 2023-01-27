import adapter from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';

const locales = ['de', 'en'];
const localizedSSGPaths = ['privacy'];

const localizedPath = (path) => locales.map((locale) => `/${locale}/${path}`);
const prerenderEntries = localizedSSGPaths.map((path) => localizedPath(path)).flat();

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: preprocess(),
  kit: {
    adapter: adapter({
      precompress: true,
    }),
    alias: {
      $i18n: 'src/lib/i18n',
      $lib: 'src/lib',
      '~': 'src',
    },
    prerender: {
      entries: prerenderEntries,
    },
  },
};

export default config;
