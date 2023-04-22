<script lang="ts">
  import Image from '@zerodevx/svelte-img';
  import { website } from '$lib/config';

  let className = '';
  export { className as class };

  export let quality = 80;
  export let imageWidths = [600, 1200];
  export let formats = ['webp', 'avif', 'jpg'];
  export let baseUrl = website.assetEndpoint;

  export let placeholder: string | null = null;
  export let alt: string | null = null;
  export let key: string;
  export let height: number;
  export let sizes: string;

  const src = [
    ...imageWidths
      .map((width) =>
        formats.map((format) => ({
          src: `${baseUrl}/${key}?fit=contain&width=${width}&quality=${quality}&format=${format}&upscaling=false`,
          height,
          format,
          width,
        }))
      )
      .flat(1),
    { base64: placeholder },
  ];
</script>

<Image {src} {alt} {sizes} class={className} />
