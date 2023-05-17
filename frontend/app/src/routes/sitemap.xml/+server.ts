import { config } from '$lib/config';
import { baseLocale, locales } from '$lib/i18n/i18n-util';

interface Route {
  path: string;
  priority: number;
}

const generateLocalizedUrls = (root: string, routes: Route[]) => {
  return routes
    .map(
      (route) =>
        `<url><loc>${root}/${baseLocale}/${route.path}</loc>${locales
          .map((locale) => `<xhtml:link rel="alternate" hreflang="${locale}" href="${root}/${locale}/${route.path}"/>`)
          .join('')}<priority>${route.priority}</priority></url>`
    )
    .join('');
};

export function GET() {
  const localizedRoutes = [
    { path: '', priority: 0.8 },
    { path: 'privacy', priority: 0.5 },
    { path: 'imprint', priority: 0.5 },
  ];

  return new Response(
    `
    <?xml version="1.0" encoding="UTF-8" ?>
    <urlset
      xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xhtml="https://www.w3.org/1999/xhtml"
      xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
      xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
      xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
      xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
    >
      ${generateLocalizedUrls(config.siteUrl, localizedRoutes)}
    </urlset>`.trim(),
    {
      headers: {
        'Cache-Control': `max-age=0, s-max-age=${3600}`,
        'Content-Type': 'application/xml',
      },
    }
  );
}
