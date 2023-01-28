import type { Locales } from './i18n-types';

export const localeToCode = (locale: Locales) => {
  const converter = {
    de: 'de-DE',
    en: 'en-US',
  };
  return converter[locale];
};
