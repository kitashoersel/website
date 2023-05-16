<script lang="ts">
  import Carousel, { type SwipeFunction } from '$lib/Carousel.svelte';

  let swipe: SwipeFunction;
</script>

<div class="container">
  <h1>Svelte Carousel</h1>

  <Carousel style="width: 500px" count={3} bind:swipe>
    <div style="height: 350px; background: red" />
    <div style="height: 350px; background: green" />
    <div style="height: 350px; background: yellow" />

    <button slot="button-right" on:click={() => swipe('right')}>R</button>
    <button slot="button-left" on:click={() => swipe('left')}>L</button>
  </Carousel>
</div>

<style>
  :global(body) {
    margin: 0;
  }

  .container {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
