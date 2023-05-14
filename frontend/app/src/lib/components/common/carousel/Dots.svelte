<script lang="ts">
  import { LL } from '$i18n/i18n-svelte';

  export let count: number;
  export let active: number;
  export let onclick: (i: number) => void;
</script>

{#each { length: count - 2 } as _, i}
  <div
    role="button"
    tabindex="0"
    aria-label={$LL.components.show_x_image({ index: i + 1 })}
    class={`h-[6px] w-[6px] cursor-pointer rounded-full bg-primary-100 bg-opacity-50 transition-transform ${
      active === i + 1 ? 'scale-125 bg-primary-700' : ''
    }`}
    on:click={() => onclick(i + 1)}
    on:keydown={({ key }) => {
      if (key === 'Enter') onclick(i + 1);
    }}
  />
{/each}
