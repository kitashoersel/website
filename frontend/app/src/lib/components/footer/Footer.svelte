<script lang="ts" context="module">
  export interface LinkProp {
    label: string;
    href: string;
  }
</script>

<script lang="ts">
  import Links from '~lib/components/footer/components/Links.svelte';

  export let links: LinkProp[] | null = null;
</script>

<footer class="relative z-10">
  <Links {links} />
</footer>
