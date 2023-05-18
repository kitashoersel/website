import type { Handle, HandleFetch } from '@sveltejs/kit';
import { cached, initializeI18n } from '$lib/utils/sveltekit';

const cacheVersion = 'v7';

export const handle: Handle = async ({ event, resolve }) => {
  const { isDataRequest, url, request, locals } = event;
  if (isDataRequest) return resolve(event);

  return (
    initializeI18n(url.pathname, request, (locale, LL) => (event.locals = { locale, LL })) ??
    cached(`rendered:${cacheVersion}:${url.pathname}`, async () =>
      resolve(event, { transformPageChunk: ({ html }) => html.setLang(locals.locale).setFonts(url.origin) })
    )
  );
};

export const handleFetch: HandleFetch = async ({ request, fetch }) => {
  const id = new URL(request.url).searchParams.get('req');
  if (!id) return fetch(request);
  return cached(`fetch:${cacheVersion}:${id}`, () => fetch(request));
};
