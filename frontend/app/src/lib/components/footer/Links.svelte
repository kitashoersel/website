<script lang="ts">
  import { LL } from '$i18n/i18n-svelte';
  import Link from '$lib/components/common/Link.svelte';
  import type { LinkProp } from '$lib/components/footer/Footer.svelte';
  import { page } from '$app/stores';

  export let links: LinkProp[] | null = null;
</script>

<div class="rounded-t-2xl bg-primary-600 p-10 text-white lg:px-20 lg:py-10">
  <div class="lg:mb-10 lg:flex lg:items-center lg:justify-between">
    <h2 class="mb-5 text-body-lg lg:mb-0 lg:text-body-xl">{$LL.footer.header()}</h2>
    <div class="mb-7 space-y-3 text-body-no lg:mb-0 lg:text-body-md">
      <ul class="sm:flex sm:gap-5 lg:justify-end">
        <li>{$LL.footer.contact()}</li>
        <li>
          <span>[</span>
          <Link i11n href={`${$LL.routes.mechterstaedt()}#${$LL.routes.contact()}`} class="text-secondary-100">
            {$LL.mechterstaedt()}
          </Link>
          <span> / </span>
          <Link i11n href={`${$LL.routes.teutleben()}#${$LL.routes.contact()}`} class="text-secondary-100">
            {$LL.teutleben()}
          </Link>
          <span>]</span>
        </li>
      </ul>
      <ul class="flex gap-5 lg:justify-end">
        {#if $page.url.pathname.endsWith($LL.routes.imprint())}
          <li><Link i11n href={$LL.routes.privacy()} class="text-secondary-100">{$LL.footer.privacy()}</Link></li>
        {/if}
        {#if $page.url.pathname.endsWith($LL.routes.privacy())}
          <li><Link i11n href={$LL.routes.imprint()} class="text-secondary-100">{$LL.footer.imprint()}</Link></li>
        {/if}
      </ul>
    </div>
  </div>

  <hr class="mb-7 h-[2px] rounded-md border-none bg-primary-500 opacity-80" />

  <div class="lg:flex lg:items-center lg:justify-between">
    {#if links}
      <ul class="mb-10 flex flex-col gap-2 lg:mb-0 lg:flex-row lg:gap-5 lg:space-y-0">
        {#each links as { href, label }}
          <li><Link i11n {href} class="text-secondary-100">{label}</Link></li>
        {/each}
      </ul>
    {/if}
    <p class="text-body-sm lg:text-right lg:text-body-md">
      <span>{@html $LL.footer.watermark()}</span>
      <Link newTab href="https://www.linkedin.com/in/tobias-kärst">Tobias Kärst</Link>
    </p>
  </div>
</div>
