<script lang="ts">
  import Image, { type ImageSource } from '$lib/Image.svelte';

  const images: ImageSource[] = [
    {
      src: 'https://admin.kitashoersel.de/assets/94f4a975-777b-4dcf-8b19-bd109f0956af?fit=contain&width=600&quality=80&format=webp&upscaling=false',
      format: 'webp',
      width: 1440,
      height: 1080,
    },
    {
      src: 'https://admin.kitashoersel.de/assets/94f4a975-777b-4dcf-8b19-bd109f0956af?fit=contain&width=600&quality=80&format=jpeg&upscaling=false',
      format: 'jpeg',
      width: 1440,
      height: 1080,
    },
  ];
</script>

<div class="container">
  <h1>Svelte Image</h1>
  <div class="image">
    <Image src={images} />
  </div>
</div>

<style>
  .image {
    width: 100%;
  }

  .container {
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    max-width: 80rem;
  }

  @media (min-width: 1024px) {
    .container {
      width: 85%;
    }

    .image {
      width: 50%;
    }
  }
</style>
