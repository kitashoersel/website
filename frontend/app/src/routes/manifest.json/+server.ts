import { get } from 'svelte/store';
import { LL } from '$i18n/i18n-svelte';
import type { RequestHandler } from './$types';
import { config } from '~lib/config';

export const GET = (() => {
  return new Response(
    JSON.stringify({
      name: get(LL).config.title(),
      short_name: get(LL).config.shortTitle(),
      description: get(LL).config.description(),
      background_color: config.siteBackgroundColor,
      theme_color: config.siteThemeColor,
      display: 'standalone',
      start_url: '/',
      icons: [
        { src: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
        { src: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
      ],
    }),
    {
      headers: {
        'Cache-Control': `max-age=0, s-max-age=${18000}`,
        'Content-Type': 'application/json',
      },
    }
  );
}) satisfies RequestHandler;
