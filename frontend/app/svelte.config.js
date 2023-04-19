import adapter from '@modules/sveltekit-adapter-docker';
import preprocess from 'svelte-preprocess';

const locales = ['de', 'en'];
const localizedSSGPaths = ['privacy', 'imprint'];

const localizedPath = (path) => locales.map((locale) => `/${locale}/${path}`);
const prerenderEntries = localizedSSGPaths.map((path) => localizedPath(path)).flat();

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: preprocess(),
  kit: {
    adapter: adapter({
      precompress: true,
      hostName: 'kite-webserver',
      hostPort: 3000,
      nginxPort: 3001,
      languages: ['de', 'en'],
      immutables: { immutableFolders: ['fonts'] },
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
