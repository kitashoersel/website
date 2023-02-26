<script lang="ts">
  import { onMount } from 'svelte';
  import Fonts from '$lib/components/core/Fonts.svelte';
  import { dev } from '$app/environment';

  import '$lib/styles/styles.scss';

  onMount(() => {
    navigator.serviceWorker
      .register('/service-worker.js', {
        type: dev ? 'module' : 'classic',
      })
      .catch(() => {
        /* eslint-disable no-console */
        console.error('could not register dev service worker');
      });
  });
</script>

<Fonts />
<div class="w-full bg-white font-poppins text-primary-600">
  <slot />
</div>
