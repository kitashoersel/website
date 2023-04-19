<script lang="ts">
  import { LL } from '$i18n/i18n-svelte';
  import Link from '$lib/components/common/Link.svelte';
  import { page } from '$app/stores';

  import type { LinkProp } from './Footer';

  export let links: LinkProp[] | null = null;

  const year = new Date().getFullYear();
  const { pathname } = $page.url;
</script>

<div class="rounded-t-2xl bg-primary-600 p-10 text-white lg:px-20 lg:py-10">
  <div class="lg:mb-10 lg:flex lg:items-center lg:justify-between">
    <h2 class="mb-5 text-body-lg lg:mb-0 lg:text-body-xl">{$LL.footer.header()}</h2>
    <div class="mb-7 space-y-3 text-body-no lg:mb-0 lg:text-body-md">
      <ul class="flex gap-5 lg:justify-end">
        <li>{$LL.footer.contact()}</li>
        <li>
          <span>[</span>
          <Link i11n href="/mechterstaedt#contact">{$LL.mechterstaedt()}</Link>
          <span> / </span>
          <Link i11n href="/teutleben#contact">{$LL.teutleben()}</Link>
          <span>]</span>
        </li>
      </ul>
      <ul class="flex gap-5 lg:justify-end">
        {#if !pathname.endsWith('/privacy')}
          <li><Link i11n href="/privacy">{$LL.footer.privacy()}</Link></li>
        {/if}
        {#if !pathname.endsWith('/imprint')}
          <li><Link i11n href="/imprint">{$LL.footer.imprint()}</Link></li>
        {/if}
      </ul>
    </div>
  </div>

  <hr class="mb-7 h-[2px] rounded-md border-none bg-primary-500 opacity-80" />

  <div class="lg:flex lg:items-center lg:justify-between">
    {#if links}
      <ul class="mb-10 flex flex-col gap-2 lg:mb-0 lg:flex-row lg:gap-5 lg:space-y-0">
        {#each links as { href, label }}
          <li><Link i11n {href}>{label}</Link></li>
        {/each}
      </ul>
    {/if}

    <p class="text-body-sm lg:text-right lg:text-body-md">{@html $LL.footer.copyright({ year })}</p>
  </div>
</div>
