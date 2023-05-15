<script context="module" lang="ts">
  export type ImageTransformData = {
    width: number;
    format: Format;
    id: string;
    quality: number;
  };
</script>

<script lang="ts">
  import Image, { type Format } from '$lib/Image.svelte';

  /** unique  id or filename of the image  */
  export let id: string;

  /** width of the original image */
  export let width: number;

  /** height of the original image */
  export let height: number;

  /** callback to generate the url of the image  */
  export let generateImageUrl: ({ width, format, id, quality }: ImageTransformData) => string;

  /** quality of the image */
  export let quality = 80;

  /** widths the image should be transformed to */
  export let imageWidths = [600, 1200];

  /** formats the image should be transformed to */
  export let formats: Format[] = ['webp', 'avif', 'jpg'];

  /** base64 data of a low res version of the image as placeholder */
  export let placeholder: string | null = null;

  /** title of the image which gets used as `alt` attribute */
  export let title: string | null = null;

  /** image `sizes` attribute for responsive images */
  export let sizes: string | null = null;

  const src = [
    ...imageWidths
      .map((transformedWidth) =>
        formats.map((format) => ({
          src: generateImageUrl({ width: transformedWidth, format, id, quality }),
          width: transformedWidth,
          height: (height / width) * transformedWidth,
          format,
        }))
      )
      .flat(1),
  ];
</script>

<Image {src} {title} {sizes} {placeholder} draggable="false" {...$$restProps} />
