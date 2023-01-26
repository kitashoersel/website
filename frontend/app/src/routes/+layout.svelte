<script lang="typescript">
  import { setLocale } from '$i18n/i18n-svelte';
  import { page } from '$app/stores';
  import type { LayoutData } from './$types';

  export let data: LayoutData;
  setLocale(data.locale);
</script>

<main class="bg-slate-800 w-full min-h-screen h-screen">
  <slot />
</main>

<svelte:head>
  <title>{$page.data.title || 'Kitas der Gemeinde Hörsel'}</title>
</svelte:head>

<style lang="scss" global>
  @import '../app.scss';
</style>
