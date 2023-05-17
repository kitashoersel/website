<script lang="ts">
  import Link from '$lib/components/common/Link.svelte';

  export let links: { label: string; href: string }[];
</script>

<ul class="flex justify-end gap-5 text-body-sm lg:text-body-md 2xl:text-body-lg">
  {#each links as { href, label }}
    <li><Link i11n {href} class="text-secondary-100">{label}</Link></li>
  {/each}
</ul>
