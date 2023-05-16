<script lang="ts">
  import RemoteImage from '@modules/svelte-image/RemoteImage.svelte';
  import Carousel, { type SwipeFunction } from '@modules/svelte-carousel/Carousel.svelte';

  import { LL } from '$i18n/i18n-svelte';
  import type { Image } from '$lib/pages/models';
  import { directusImageUrl } from '$lib/utils/directus';
  import RoundedButton from '$lib/components/common/widgets/RoundedButton.svelte';
  import Icon from '$lib/components/common/Icon.svelte';

  let className = '';
  export { className as class };
  export let content: string;
  export let images: Image[];

  let swipe: SwipeFunction;
</script>

<section class="relative">
  <div class={`${className} flex flex-col-reverse items-center gap-3 md:grid md:grid-cols-2 md:gap-12`}>
    <Carousel
      class="h-52 sm:h-80 w-full"
      count={images.length}
      dotsLabel={(i) => $LL.components.show_x_image({ index: i + 1 })}
      bind:swipe
    >
      {#each images as image}
        <RemoteImage
          {...image}
          generateImageUrl={directusImageUrl}
          sizes="(max-width: 1000px) 600px, 1200px"
          class="h-40 object-cover sm:h-72"
        />
      {/each}

      <RoundedButton slot="button-left" onClick={() => swipe('left')} label={$LL.components.prev_image()}>
        <Icon icon="arrow-left" />
      </RoundedButton>

      <RoundedButton slot="button-right" onClick={() => swipe('right')} label={$LL.components.next_image()}>
        <Icon icon="arrow-right" />
      </RoundedButton>
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
