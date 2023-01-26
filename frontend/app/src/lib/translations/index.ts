import type { Config } from 'sveltekit-i18n';
import i18n from 'sveltekit-i18n';
import lang from './lang.json';

export const config: Config = {
  translations: {
    en: { lang },
  },
  loaders: [
    {
      locale: 'de',
      key: 'content',
      loader: async () => (await import('./de/content.json')).default,
    },
  ],
};

export const { t, loading, locales, locale, loadTranslations } = new i18n(config);
