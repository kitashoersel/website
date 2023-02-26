<script lang="ts">
  export let preheader: string | null = null;
</script>

{#if preheader}
  <p class="text-body-sm lg:text-body-lg 2xl:text-body-xl">{preheader}</p>
{/if}
