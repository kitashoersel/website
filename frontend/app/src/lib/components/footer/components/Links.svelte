<script lang="ts">
  import { LL } from '$i18n/i18n-svelte';
  import Link from '$lib/components/common/Link.svelte';
  import type { LinkProp } from '$lib/components/footer/Footer.svelte';
  import ContactLinks from '$lib/components/footer/components/ContactLinks.svelte';
  import LegalLinks from '$lib/components/footer/components/LegalLinks.svelte';
  import Watermark from '$lib/components/footer/components/Watermark.svelte';

  export let links: LinkProp[] | null = null;
</script>

<div class="rounded-t-2xl bg-primary-600 p-10 text-white lg:px-20 lg:py-10">
  <div class="lg:mb-10 lg:flex lg:items-center lg:justify-between">
    <h2 class="mb-5 text-body-lg lg:mb-0 lg:text-body-xl">{$LL.footer.header()}</h2>
    <div class="mb-7 space-y-3 text-body-no lg:mb-0 lg:text-body-md">
      <ContactLinks />
      <LegalLinks />
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
    <Watermark />
  </div>
</div>
