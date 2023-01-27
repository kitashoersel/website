import type { Handle, RequestEvent } from '@sveltejs/kit';
import { initAcceptLanguageHeaderDetector } from 'typesafe-i18n/detectors';
import { detectLocale, i18n, isLocale } from '$i18n/i18n-util';
import { loadAllLocales } from '$i18n/i18n-util.sync';
import { website } from '$lib/config';

loadAllLocales();
const L = i18n();

const getPreferredLocale = ({ request }: RequestEvent) => {
  const acceptLanguageDetector = initAcceptLanguageHeaderDetector(request);
  return detectLocale(acceptLanguageDetector);
};

const setSecurityHeaders = (response: Response) => {
  const cspDirectives = {
    'base-uri': ["'self'"],
    'child-src': ["'self'"],
    'connect-src': ["'self'", 'ws://localhost:*', 'https://hcaptcha.com', 'https://*.hcaptcha.com'],
    'img-src': ["'self'", 'data:'],
    'font-src': ["'self'", 'data:'],
    'form-action': ["'self'"],
    'frame-ancestors': ["'self'"],
    'frame-src': ["'self'", 'https://hcaptcha.com', 'https://*.hcaptcha.com'],
    'manifest-src': ["'self'"],
    'media-src': ["'self'", 'data:'],
    'object-src': ["'none'"],
    'style-src': ["'self'", "'unsafe-inline'", 'https://hcaptcha.com', 'https://*.hcaptcha.com'],
    'default-src': ["'self'", website.siteHost, `ws://${website.siteHost}`],
    'script-src': ["'self'", "'unsafe-inline'", 'https://hcaptcha.com', 'https://*.hcaptcha.com'],
    'worker-src': ["'self'"],
  };

  const csp = Object.entries(cspDirectives)
    .map(([key, arr]) => `${key} ${arr.join(' ')}`)
    .join('; ');

  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('Referrer-Policy', 'no-referrer');
  response.headers.set(
    'Permissions-Policy',
    'accelerometer=(), autoplay=(), camera=(), document-domain=(), encrypted-media=(), fullscreen=(), gyroscope=(), magnetometer=(), microphone=(), midi=(), payment=(), picture-in-picture=(), publickey-credentials-get=(), sync-xhr=(), usb=(), xr-spatial-tracking=(), geolocation=()'
  );
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Content-Security-Policy', csp);
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');

  return response;
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

  const response = await resolve(event, {
    transformPageChunk: ({ html }) => html.replace('%lang%', locale),
  });

  return setSecurityHeaders(response);
};
