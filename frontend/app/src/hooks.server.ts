import type { Handle, RequestEvent } from '@sveltejs/kit';
import { initAcceptLanguageHeaderDetector } from 'typesafe-i18n/detectors';
import { detectLocale, i18n, isLocale } from '$i18n/i18n-util';
import { loadAllLocales } from '$i18n/i18n-util.sync';

loadAllLocales();
const L = i18n();

const getPreferredLocale = ({ request }: RequestEvent) => {
  const acceptLanguageDetector = initAcceptLanguageHeaderDetector(request);
  return detectLocale(acceptLanguageDetector);
};

export const handle: Handle = async ({ event, resolve }) => {
  const [, lang] = event.url.pathname.split('/');

  if (!lang) {
    const locale = getPreferredLocale(event);

    return new Response(null, {
      status: 302,
      headers: { Location: `/${locale}` },
    });
  }

  const locale = isLocale(lang) ? lang : getPreferredLocale(event);
  const LL = L[locale];

  event.locals.locale = locale;
  event.locals.LL = LL;

  return resolve(event, { transformPageChunk: ({ html }) => html.replace('%lang%', locale) });
};
