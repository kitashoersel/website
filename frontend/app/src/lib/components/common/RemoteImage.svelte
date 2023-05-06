<script lang="ts">
  import { website } from '$lib/config';
  import Image from '$lib/components/core/Image.svelte';

  type Formats = 'heic' | 'heif' | 'avif' | 'webp' | 'jpeg' | 'jpg' | 'png' | 'gif' | 'tiff';

  let className = '';
  export { className as class };

  export let quality = 80;
  export let imageWidths = [600, 1200];
  export let formats: Formats[] = ['webp', 'avif', 'jpg'];
  export let baseUrl = website.assetEndpoint;

  export let placeholder: string | null = null;
  export let title: string | null = null;
  export let id: string;
  export let height: number;
  export let width: number;
  export let sizes: string;

  const src = [
    ...imageWidths
      .map((transformedWidth) =>
        formats.map((format) => ({
          src: `${baseUrl}/${id}?fit=contain&width=${transformedWidth}&quality=${quality}&format=${format}&upscaling=false`,
          width: transformedWidth,
          height: (height / width) * transformedWidth,
          format,
        }))
      )
      .flat(1),
  ];
</script>

<Image {src} {title} {sizes} base64={placeholder} class={className} draggable="false" />
