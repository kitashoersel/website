<script lang="ts">
  import SimpleHeader from '$lib/components/SimpleHeader.svelte';
  import type { LayoutData } from './$types';

  import './+layout.scss';

  export let data: LayoutData;
</script>

<SimpleHeader title={data.title} description={data.description} />
<main class="article-container mx-auto py-10 px-8 lg:w-3/4 lg:py-20">
  <article class="prose-sm prose-a:text-secondary-700 lg:prose-xl">
    <slot />
  </article>
</main>
