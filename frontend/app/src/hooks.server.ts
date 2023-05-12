import type { Handle } from '@sveltejs/kit';
import { initializeI18n } from '$lib/utils/sveltekit';

export const handle: Handle = async ({ event, resolve }) => {
  const i18nResponse = initializeI18n(event.url.pathname, event.request, (locale, LL) => {
    event.locals = { locale, LL };
  });

  const htmlResponse = resolve(event, {
    transformPageChunk: ({ html }) => html.setLang(event.locals.locale).setFonts(event.url.origin),
  });

  return i18nResponse ?? htmlResponse;
};
