<script lang="ts">
  export let count: number;
  export let active: number;
  export let onclick: (i: number) => void;
  export let label = (i: number) => `show image at position ${i}`;
</script>

{#each { length: count } as _, i}
  <div
    class="carousel-dot"
    class:active-dot={active === i}
    role="button"
    tabindex="0"
    aria-label={label(i + 1)}
    on:click={() => onclick(i)}
    on:keydown={({ key }) => (key === 'Enter' ? onclick(i) : null)}
  />
{/each}

<style>
  .active-dot {
    transform: scale(1.25);
    background-color: rgb(30 41 63 / 0.5);
  }

  .carousel-dot {
    height: 6px;
    width: 6px;
    cursor: pointer;
    border-radius: 9999px;
    background-color: rgb(154 164 185 / 0.5);
    transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
  }
</style>
