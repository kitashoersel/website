<script>
  import ComingSoonPage from '$lib/pages/coming-soon/ComingSoonPage.svelte';
  import { config } from '$lib/config';

  let released = config.release.getTime() - Date.now() <= 0;
  const onFinish = () => (released = true);
</script>

{#if released}
  <slot />
{:else}
  <ComingSoonPage release={config.release} {onFinish} />
{/if}
