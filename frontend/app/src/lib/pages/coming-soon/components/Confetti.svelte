<script lang="ts">
  export let amount = 20;

  const shapes = ['rectangle', 'cross', 'round'];

  const randomBetween = (min: number, max: number) => Math.random() * (max - min) + min;
  const randomColor = () => `hsl(${Math.round(randomBetween(0, 300))}, 90%, 70%`;
  const randomShape = () => shapes[Math.floor(randomBetween(0, 3))];
</script>

{#each { length: amount } as _}
  <div
    class="confetti pointer-events-none inset-1/2 {randomShape()}"
    style="
        --color: {randomColor()};
        --rotation-deg: {randomBetween(0, 360)}deg;
        --position-x: {randomBetween(-45, 45) / 100};
        --position-y: {randomBetween(-45, 45) / 100};
      "
  />
{/each}

<style>
  .confetti {
    transform: translate(calc(100vw * var(--position-x)), calc(100vh * var(--position-y)));
    transition-property: transform;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
    rotate: var(--rotation-deg);
  }

  .confetti,
  .cross::before {
    position: absolute;
    background: var(--color);
  }

  .rectangle {
    height: 30px;
    aspect-ratio: 1/3;
  }

  .round {
    border-radius: 50%;
    height: 15px;
    aspect-ratio: 1;
  }

  .cross,
  .cross::before {
    height: 30px;
    aspect-ratio: 1/4;
  }

  .cross::before {
    content: '';
    rotate: 91deg;
  }

  @media (min-width: 768px) {
    .cross,
    .cross::before {
      height: 45px;
    }

    .round {
      height: 20px;
    }

    .rectangle {
      height: 45px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .confetti {
      transition: none !important;
    }
  }
</style>
