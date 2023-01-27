<script lang="ts">
  import { locales, baseLocale } from '$i18n/i18n-util';
  import { page } from '$app/stores';

  const replaceLocaleInUrl = (url: URL, locale: string, full = false): string => {
    const [, , ...rest] = url.pathname.split('/');
    const newPathname = `/${[locale, ...rest].join('/')}`;
    if (!full) {
      return `${newPathname}${url.search}`;
    }
    const newUrl = new URL(url.toString());
    newUrl.pathname = newPathname;
    return newUrl.toString();
  };
</script>

<svelte:head>
  {#each locales as l}
    <link rel="alternate" hreflang={l} href={`${replaceLocaleInUrl($page.url, l, true)}`} />
  {/each}
  <link
    rel="alternate"
    hreflang="x-default"
    href={`${replaceLocaleInUrl($page.url, baseLocale, true)}`}
  />
</svelte:head>
