<script lang="ts">
  type Formats = 'heic' | 'heif' | 'avif' | 'webp' | 'jpeg' | 'jpg' | 'png' | 'gif' | 'tiff';

  type ImageSource = {
    format: Formats;
    src: string;
    width: number;
    height: number;
  };

  type ImageGroup = {
    format: string;
    srcset: string;
    src: string;
    width: number;
    height: number;
  };

  type Image = ImageGroup & {
    lqip: string | null;
  };

  export let sizes: string | null = null;
  export let width: number | null = null;
  export let height: number | null = null;
  export let base64: string | null = null;
  export let src: ImageSource[] = [];
  export let ref: HTMLImageElement | null = null;
  export let loading: 'lazy' | 'eager' = 'lazy';
  export let decoding: 'async' | 'auto' | 'sync' = 'async';

  const priority = ['heic', 'heif', 'avif', 'webp', 'jpeg', 'jpg', 'png', 'gif', 'tiff'];

  let image: Image | null = null;
  let sources: ImageGroup[] = [];

  $: if (src.length) {
    const lqip = base64 ? `url('${base64}') no-repeat center/cover` : null;

    const groups = priority
      .map((format) => {
        const group = src.filter((i) => i.format === format);
        if (group.length === 0) return null;

        group.sort((a, b) => a.width - b.width);
        const widestGroup = group[group.length - 1];

        return {
          format: format === 'jpg' ? 'jpeg' : format,
          srcset: group.reduce<string[]>((a, c) => [...a, `${c.src} ${c.width}w`], []).join(','),
          src: widestGroup.src,
          width: widestGroup.width,
          height: widestGroup.height,
        };
      })
      .filter((element): element is ImageGroup => element !== null);

    image = { ...groups.pop()!, lqip };
    sources = groups;
  }
</script>

{#if image?.src}
  <picture>
    {#each sources as { format, srcset }}
      <source type="image/{format}" {srcset} {sizes} />
    {/each}
    <!-- svelte-ignore a11y-missing-attribute -->
    <img
      src={image.src}
      srcset={image.srcset}
      {sizes}
      width={width || image.width || undefined}
      height={height || image.height || undefined}
      {loading}
      {decoding}
      style:background={image.lqip}
      bind:this={ref}
      on:click
      on:load
      {...$$restProps}
    />
  </picture>
{/if}
