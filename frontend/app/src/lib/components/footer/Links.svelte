<script lang="ts">
  import { LL } from '$i18n/i18n-svelte';
  import Link from '$lib/components/common/Link.svelte';
  import type { LinkProp } from './Footer';

  export let links: LinkProp[] | null = null;

  const year = new Date().getFullYear();
</script>

<div class="rounded-t-2xl bg-primary-600 p-10 text-white lg:py-10 lg:px-20">
  <div class="lg:mb-10 lg:flex lg:items-center lg:justify-between">
    <h3 class="mb-5 text-body-lg lg:mb-0 lg:text-body-xl">{$LL.footer.header()}</h3>
    <ul class="mb-7 flex gap-5 text-body-no lg:mb-0 lg:text-body-md">
      <li><Link i11n href="/privacy">{$LL.footer.privacy()}</Link></li>
      <li><Link i11n href="/imprint">{$LL.footer.imprint()}</Link></li>
      <li><Link i11n href="/contact">{$LL.footer.contact()}</Link></li>
    </ul>
  </div>

  <hr class="mb-7 h-[2px] rounded-md border-none  bg-primary-500 opacity-80" />

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
