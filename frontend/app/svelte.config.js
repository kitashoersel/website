import adapter from '@modules/sveltekit-adapter-docker';
import preprocess from 'svelte-preprocess';

const locales = ['de', 'en'];
const localizedSSGPaths = ['privacy', 'imprint'];

const localizedPath = (path) => locales.map((locale) => `/${locale}/${path}`);
const prerenderEntries = localizedSSGPaths.map((path) => localizedPath(path)).flat();

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: preprocess({
    scss: {
      importer(url, prev) {
        if (url === '$THEME') {
          return { file: './src/lib/style/theme/_index.scss' };
        }
        return { file: prev };
      },
    },
  }),
  kit: {
    adapter: adapter({
      immutables: { immutableFolders: ['fonts', 'icons'] },
      hostName: 'webserver',
      languages: locales,
    }),
    csp: {
      mode: 'auto',
      directives: { 'style-src': ['self', 'unsafe-inline'], 'script-src': ['self', 'unsafe-inline'] },
    },
    alias: {
      $i18n: 'src/lib/i18n',
      $styles: 'src/lib/styles',
      '~lib': 'src/lib',
      '~': 'src',
    },
    prerender: {
      entries: prerenderEntries,
    },
  },
};

export default config;
