import { initAcceptLanguageHeaderDetector } from 'typesafe-i18n/detectors';
import { building } from '$app/environment';
import { detectLocale, i18n, isLocale } from '$i18n/i18n-util';
import { loadAllLocales } from '$i18n/i18n-util.sync';
import { redis } from '$lib/backend/redis';

declare global {
  interface String {
    setLang(lang: string): string;
    setFonts(url: string): string;
  }
}

loadAllLocales();
const L = i18n();

String.prototype.setLang = function (lang: string) {
  return String(this).replace('%lang%', lang);
};

String.prototype.setFonts = function (url: string) {
  return String(this).replace(
    /<link\s+%font\s*=\s*"((\S*\/(\S*?)-(\S*?)-(\S*?)-(\S*?))\.(\S*))"\s+\/>/gm,
    `<link rel="preload" href="${url}/$1" as="font" type="font/$7" crossorigin="anonymous"/>
     <style> @font-face { font-family: '$3'; font-style: $6; font-display: swap; font-weight: $5; src: url('${url}/$2.woff2') format('woff2'), url('${url}/$2.woff') format('woff');}</style>`
  );
};

const getPreferredLocale = (req: Request) => {
  const acceptLanguageDetector = initAcceptLanguageHeaderDetector(req);
  return detectLocale(acceptLanguageDetector);
};

const prependPreferredLangToUrl = (req: Request) => {
  const locale = getPreferredLocale(req);
  return new Response(null, { status: 302, headers: { Location: `/${locale}` } });
};

export const initializeI18n = (
  pathname: string,
  req: Request,
  done: (locale: Locales, LL: TranslationFunctions) => void
) => {
  const [, lang] = pathname.split('/');
  if (!lang) return prependPreferredLangToUrl(req);
  const locale = isLocale(lang) ? lang : getPreferredLocale(req);
  const LL = L[locale];
  done(locale, LL);
  return undefined;
};

export const cached = async (key: string, resolve: () => Promise<Response>): Promise<Response> => {
  if (!redis.isConnected() || building) return resolve();

  try {
    let cachedResponse = await redis.client.hGetAll(key);

    if (!cachedResponse.body) {
      const response = await resolve();

      cachedResponse = {
        ...Object.fromEntries(response.headers.entries()),
        body: await response.text(),
        status: response.status.toString(),
        statusText: response.statusText,
      };

      if (response.status === 200) redis.client.hSet(key, cachedResponse);
    }

    const { body, status, statusText, ...headers } = cachedResponse;
    return new Response(body, { headers: new Headers(headers), status: parseInt(status, 10), statusText });
  } catch (_) {
    return resolve();
  }
};
