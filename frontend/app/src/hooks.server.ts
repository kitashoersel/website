import type { Handle, HandleFetch } from '@sveltejs/kit';
import { cached, initializeI18n } from '$lib/utils/sveltekit';
import { config } from '$lib/config';

const cacheVersion = 'v7';

export const handle: Handle = async ({ event, resolve }) => {
  const { isDataRequest, url, request } = event;
  if (isDataRequest) return resolve(event);

  return (
    initializeI18n(url.pathname, request, (locale, LL) => (event.locals = { locale, LL })) ??
    cached(`rendered:${cacheVersion}:${url.pathname}`, async () =>
      resolve(event, { transformPageChunk: ({ html }) => html.setLang(event.locals.locale).setFonts(config.siteUrl) })
    )
  );
};

export const handleFetch: HandleFetch = async ({ request, fetch }) => {
  const id = new URL(request.url).searchParams.get('req');
  if (!id) return fetch(request);
  return cached(`fetch:${cacheVersion}:${id}`, () => fetch(request));
};
