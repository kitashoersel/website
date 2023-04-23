<script lang="ts">
  import { onMount } from 'svelte';

  let loading = true;
  onMount(() => {
    loading = false;
  });
</script>

<div class:loading>
  <slot />
</div>

<style>
  .loading {
    display: none;
  }
</style>
