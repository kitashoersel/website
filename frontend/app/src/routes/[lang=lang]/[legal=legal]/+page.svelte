<script lang="ts">
  import Seo from '$lib/components/common/SEO.svelte';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<Seo title={data.title} description={data.description} />

<div>{@html data.content}</div>
