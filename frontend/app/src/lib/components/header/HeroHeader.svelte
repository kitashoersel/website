<script lang="ts">
  import BoySilhouette from '$lib/components/header/components/BoySilhouette.svelte';
  import Link from '$lib/components/common/Link.svelte';
  import GirlSilhouette from '$lib/components/header/components/GirlSilhouette.svelte';
  import Parallax from '$lib/components/common/Parallax.svelte';
  import ForestScene from '$lib/assets/forest_illustration.svg';

  export let header: string;
  export let preheader: string | null = null;
  export let links: { label: string; href: string }[];
</script>

<header class="max-h-[50rem]">
  <div class="relative max-h-[50rem]">
    <Parallax rate={1} class="absolute bottom-0 left-20 w-28"><BoySilhouette /></Parallax>
    <Parallax rate={2} class="absolute bottom-0 w-28"><GirlSilhouette /></Parallax>
    <img src={ForestScene} alt="forest at daytime" class="aspect-[16/9] max-h-[50rem] w-full bg-[#99bd85]" />
  </div>

  <Parallax class="rounded-b-2xl bg-primary-600 p-10 text-neutral-0 shadow-xl" rate={3} offset={1}>
    {#if preheader}
      <p class="text-body-sm">{preheader}</p>
    {/if}
    <h1 class="mb-5 text-header-sm font-bold">{header}</h1>
    <ul class="flex justify-end gap-5 text-body-sm">
      {#each links as { href, label }}
        <li><Link i11n {href}>{label}</Link></li>
      {/each}
    </ul>
  </Parallax>
</header>
