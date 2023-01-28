<script lang="ts">
  import { LL } from '$i18n/i18n-svelte';
  import Link from '$lib/components/common/Link.svelte';
  import { shortDate } from '$lib/utils/date-transformer';
  import { page } from '$app/stores';

  export let title: string;
  export let description: string;
  export let publishDate: string | null = null;
  export let readingTime: number | null = null;

  const { lang } = $page.params;
</script>

<header class="flex-center rounded-b-2xl bg-primary-600 py-10 lg:py-24">
  <div class="article-container flex flex-col-reverse px-8 lg:w-3/4 lg:flex-col">
    <ul class="mb-10 flex gap-5 text-body-md lg:justify-end lg:text-body-lg">
      <li><Link i11n href="/">{$LL.header.home()}</Link></li>
      <li><Link i11n href="/mechterstaedt">{$LL.mechterstaedt()}</Link></li>
      <li><Link i11n href="/teutleben">{$LL.teutleben()}</Link></li>
    </ul>
    <div class="mb-10 text-primary-100 lg:mb-0">
      {#if publishDate && readingTime}
        {shortDate(publishDate, lang)} ~ {readingTime} min
      {/if}
      <h1 class="mb-5 text-header-md font-bold text-white lg:text-header-lg">{title}</h1>
      <p class="text-body-md text-primary-100 lg:text-body-lg">{description}</p>
    </div>
  </div>
</header>
