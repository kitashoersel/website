<script lang="ts">
  import { get } from 'svelte/store';
  import { LL } from '$i18n/i18n-svelte';
  import { locales, baseLocale } from '$i18n/i18n-util';
  import { page } from '$app/stores';
  import { config } from '$lib/config';

  export let title: string = get(LL).config.shortTitle();
  export let description: string = get(LL).config.description();
  export let keywords: string | null = null;
  export let applicationName: string = get(LL).config.shortTitle();
  export let themeColor = config.siteThemeColor;
  export let base = config.siteUrl;
  export let canonical = `https://${$page.url.host}${$page.url.pathname}`;
  export let nofollow = false;
  export let noindex = false;
  export let nositelinkssearchbox = false;
  export let notranslate = true;
  export let manifest = '/manifest.json';

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
  <title>{title}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={canonical} />
  <meta name="keywords" content={`${$LL.config.siteKeywords()}${`,${keywords}` ?? ''}`} />
  <link rel="manifest" href={manifest} />
  <meta name="application-name" content={applicationName} />
  <meta name="theme-color" content={themeColor} />
  <base href={base} />
  <meta name="robots" content={`${noindex ? 'noindex' : 'index'},${nofollow ? 'nofollow' : 'follow'}`} />
  <meta name="googlebot" content={`${noindex ? 'noindex' : 'index'},${nofollow ? 'nofollow' : 'follow'}`} />
  {#if nositelinkssearchbox}
    <meta name="google" content="nositelinkssearchbox" />
  {/if}
  {#if notranslate}
    <meta name="google" content="notranslate" />
  {/if}
  {#each locales as l}
    <link rel="alternate" hreflang={l} href={`${replaceLocaleInUrl($page.url, l, true)}`} />
  {/each}
  <link rel="alternate" hreflang="x-default" href={`${replaceLocaleInUrl($page.url, baseLocale, true)}`} />
  <slot />
</svelte:head>
