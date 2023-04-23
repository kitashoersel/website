<script lang="ts">
  import SimpleHeader from '$lib/components/header/SimpleHeader.svelte';
  import Footer from '$lib/components/footer/Footer.svelte';
  import type { LayoutData } from './$types';

  export let data: LayoutData;
</script>

<SimpleHeader title={data.title} description={data.description} />
<main class="article-container mx-auto px-8 py-10 lg:w-3/4 lg:py-20">
  <article class="prose-sm lg:prose-xl prose-headings:font-medium prose-a:text-secondary-700">
    <slot />
  </article>
</main>
<Footer />
