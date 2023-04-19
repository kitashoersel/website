<script>
  import ComingSoonPage from '$lib/views/coming-soon/ComingSoonPage.svelte';
  import { website } from '$lib/config';

  let released = false;
  const onFinish = () => {
    released = true;
  };
</script>

{#if released}
  <slot />
{/if}

{#if !released}
  <ComingSoonPage release={website.release} {onFinish} />
{/if}
