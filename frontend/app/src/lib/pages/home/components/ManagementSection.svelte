<script lang="ts">
  import type { Image } from '$lib/pages/models';
  import Carousel from '$lib/components/common/carousel/Carousel.svelte';
  import RemoteImage from '$lib/components/common/RemoteImage.svelte';

  let className = '';
  export { className as class };
  export let content: string;
  export let images: Image[];
</script>

<section class="relative">
  <div class={`${className} flex flex-col-reverse items-center gap-3 md:grid md:grid-cols-2 md:gap-12`}>
    <Carousel classNames="h-40 sm:h-72 w-full" imageClassNames="rounded-lg">
      {#each images as image}
        <RemoteImage {...image} sizes="(max-width: 1000px) 600px, 1200px" class="h-40 object-cover sm:h-72" />
      {/each}
    </Carousel>
    <div class="remote-html space-y-6 pb-3 text-left">{@html content}</div>
  </div>
  <div class="back-shadow absolute top-0 -z-10 h-96 w-full" />
</section>

<style>
  .back-shadow {
    background: linear-gradient(
      0deg,
      rgba(34, 193, 195, 0) 0%,
      rgba(216, 238, 255, 0.25) 10%,
      rgba(216, 238, 255, 0.4) 25%,
      rgba(216, 238, 255, 0.5) 50%,
      rgba(216, 238, 255, 0.4) 75%,
      rgba(216, 238, 255, 0.25) 90%,
      rgba(253, 187, 45, 0) 100%
    );
  }
</style>
