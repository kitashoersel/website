<script>
  import ComingSoonPage from '$lib/pages/coming-soon/ComingSoonPage.svelte';
  import { website } from '$lib/config';

  let released = website.release.getTime() - Date.now() <= 0;
  const onFinish = () => (released = true);
</script>

{#if released}
  <slot />
{:else}
  <ComingSoonPage release={website.release} {onFinish} />
{/if}
