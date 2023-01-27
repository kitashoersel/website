import { website } from '$lib/config';
import type { RequestHandler } from './$types';

export const GET = (() => {
  return new Response(
    JSON.stringify({
      name: website.siteTitle,
      short_name: website.siteShortTitle,
      description: website.siteDescription,
      start_url: '/',
      background_color: website.siteBackgroundColor,
      theme_color: website.siteThemeColor,
      display: 'standalone',
    }),
    {
      headers: {
        'Cache-Control': `max-age=0, s-max-age=${18000}`,
        'Content-Type': 'application/xml',
      },
    }
  );
}) satisfies RequestHandler;
