<script lang="ts">
  import RemoteImage from '@modules/svelte-image/RemoteImage.svelte';
  import { tilt } from '$lib/actions/tilt';
  import type { Image } from '$lib/pages/models';
  import Link from '$lib/components/common/Link.svelte';
  import { directusImageUrl } from '$lib/utils/directus';

  export let title: string;
  export let image: Image;
  export let href: string;
</script>

<Link {href} i11n animate={false} class="relative w-full cursor-pointer select-none shadow-lg">
  <div use:tilt={{ max: 5, scale: 1.05 }} class="relative h-52 md:h-48 xl:h-80" style="transform-style: preserve-3d">
    <div class="realtive">
      <div class="absolute z-10 h-full w-full rounded-md bg-primary-500 opacity-70" />
      <RemoteImage
        {...image}
        generateImageUrl={directusImageUrl}
        sizes="(max-width: 1000px) 600px, 1200px"
        class="absolute h-full overflow-hidden rounded-md object-cover"
      />
    </div>

    <div class="absolute h-full w-full" style:transform="translateZ(30px)">
      <h3 class="text-shadow-lg mt-5 w-full text-center text-body-lg font-medium text-white xl:mt-10 xl:text-header-no">
        {title}
      </h3>

      <div class="absolute left-1/2 top-1/2 [&>*]:-translate-x-1/2 [&>*]:-translate-y-1/4">
        <div class="absolute h-20 w-20 rounded-full bg-primary-500 shadow-lg xl:h-32 xl:w-32" />
        <div class="w-32 xl:w-44"><slot /></div>
      </div>
    </div>
  </div>
</Link>

<style>
  .text-shadow-lg {
    text-shadow: 0 15px 30px rgba(0, 0, 0, 0.11), 0 5px 15px rgba(0, 0, 0, 0.08);
  }
</style>
