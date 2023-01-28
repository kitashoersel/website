<script lang="ts">
  import Links from './Links.svelte';
  import type { LinkProp } from './Footer';

  export let links: LinkProp[] | null = null;
</script>

<footer>
  <Links {links} />
</footer>
