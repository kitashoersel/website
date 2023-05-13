<script lang="ts">
  import BoySilhouette from '$lib/components/header/components/BoySilhouette.svelte';
  import GirlSilhouette from '$lib/components/header/components/GirlSilhouette.svelte';
  import ForestScene from '$lib/components/header/components/ForestScene.svelte';
  import VerticalSeparator from '$lib/components/header/components/VerticalSeparator.svelte';
  import HeaderLinks from '$lib/components/header/components/HeaderLinks.svelte';
  import Preheader from '$lib/components/header/components/Preheader.svelte';
  import Headline from '$lib/components/header/components/Headline.svelte';
  import { parallax } from '$lib/actions/parallax';

  export let header: string;
  export let preheader: string | null = null;
  export let links: { label: string; href: string }[];
</script>

<header class="max-h-[40rem] w-full">
  <div class="relative max-h-[40rem]">
    <div use:parallax={{ rate: 1 }} class="absolute bottom-0 left-20 w-28 lg:left-52 lg:w-44 2xl:left-60 2xl:w-56">
      <BoySilhouette />
    </div>
    <div use:parallax={{ rate: 2 }} class="absolute bottom-0 w-28 lg:left-20 lg:w-44 2xl:w-56"><GirlSilhouette /></div>
    <ForestScene class="aspect-[16/9] max-h-[40rem] w-full" />

    <div class="absolute right-0 top-0 hidden h-full w-[56%] text-neutral-0 lg:flex">
      <VerticalSeparator class="translate-x-1 text-primary-600" />
      <div class="w-full bg-primary-600 p-10 2xl:pr-[10%]">
        <HeaderLinks {links} />
        <div class="v-center h-full text-right">
          <Preheader {preheader} />
          <Headline {header} />
        </div>
      </div>
    </div>
  </div>

  <div
    use:parallax={{ rate: 3, offset: 1 }}
    class="rounded-b-2xl bg-primary-600 p-10 text-neutral-0 shadow-xl lg:hidden"
  >
    <Preheader {preheader} />
    <Headline {header} />
    <HeaderLinks {links} />
  </div>

  <div use:parallax={{ rate: 3 }} class="absolute h-2/3 w-full bg-white" />
</header>
