<script lang="ts">
  import Fonts from '$lib/components/core/Fonts.svelte';
  import '$lib/styles/styles.scss';
</script>

<Fonts />

<div class="w-full bg-white font-poppins text-primary-600">
  <slot />
</div>
