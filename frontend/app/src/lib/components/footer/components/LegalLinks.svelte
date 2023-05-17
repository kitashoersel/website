<script lang="ts">
  import { LL } from '$i18n/i18n-svelte';
  import { page } from '$app/stores';
  import Link from '$lib/components/common/Link.svelte';
</script>

<ul class="flex gap-5 lg:justify-end">
  {#if $page.url.pathname.endsWith($LL.routes.imprint())}
    <li><Link i11n href={$LL.routes.privacy()} class="text-secondary-100">{$LL.footer.privacy()}</Link></li>
  {/if}
  {#if $page.url.pathname.endsWith($LL.routes.privacy())}
    <li><Link i11n href={$LL.routes.imprint()} class="text-secondary-100">{$LL.footer.imprint()}</Link></li>
  {/if}
</ul>
