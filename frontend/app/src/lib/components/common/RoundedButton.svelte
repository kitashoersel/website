<script lang="ts">
  export let onClick: () => void;
</script>

<button
  on:click={onClick}
  class="flex h-6 w-6 items-center justify-center rounded-full bg-primary-600 p-1 text-white transition-transform hover:scale-110"
>
  <slot />
</button>
