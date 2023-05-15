<script context="module" lang="ts">
  export type Format = 'heic' | 'heif' | 'avif' | 'webp' | 'jpeg' | 'jpg' | 'png' | 'gif' | 'tiff';

  type ImageGroup = {
    format: Format;
    srcset: string;
    src: string;
    width: number;
    height: number;
  };

  export type ImageSource = Omit<ImageGroup, 'srcset'>;

  type BaseImage = ImageGroup & {
    lqip: string | null;
  };

  const formatPriority: Format[] = ['heic', 'heif', 'avif', 'webp', 'jpeg', 'jpg', 'png', 'gif', 'tiff'];
</script>

<script lang="ts">
  /** source data of the images wich should get displayed */
  export let src: ImageSource[];

  /** base64 data of a low res version of the image as placeholder */
  export let placeholder: string | null = null;

  /** title of the image which gets used as `alt` attribute */
  export let title: string | null = null;

  /** image `sizes` attribute for responsive images */
  export let sizes: string | null = null;

  /** image `loading` attribute */
  export let loading: 'lazy' | 'eager' = 'lazy';

  /** image `decoding` attribute */
  export let decoding: 'async' | 'auto' | 'sync' = 'async';

  const sources: ImageGroup[] = formatPriority
    .map((format) => {
      const group = src.filter((i) => i.format === format);
      if (group.length === 0) return null;

      group.sort((a, b) => a.width - b.width);
      return {
        ...group[group.length - 1],
        srcset: group.reduce<string[]>((a, c) => [...a, `${c.src} ${c.width}w`], []).join(','),
      };
    })
    .filter((element): element is ImageGroup => element !== null);

  const lqip = placeholder ? `url('${placeholder}') no-repeat center/cover` : null;
  const image: BaseImage = { ...sources.pop()!, lqip };
</script>

<picture>
  {#each sources as { format, srcset }}
    <source type="image/{format}" {srcset} {sizes} />
  {/each}

  <img
    src={image.src}
    srcset={image.srcset}
    alt={title}
    width="100%"
    height="auto"
    style:background={image.lqip}
    {sizes}
    {loading}
    {decoding}
    {...$$restProps}
  />
</picture>
