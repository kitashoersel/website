<script lang="ts">
  import { LL } from '$i18n/i18n-svelte';
</script>

<h1 class="animated-title relative text-center text-5xl font-bold uppercase md:text-9xl">
  {@html $LL.coming_soon.title()}
</h1>

<style lang="scss">
  .animated-title {
    --scale: 0.2;
    --shadow1: hsl(229, 75%, 52%);
    --shadow2: hsl(180, 75%, 58%);
    --shadow3: hsl(353, 75%, 55%);
    --shadow4: hsl(59, 75%, 65%);

    animation: text-shadow 2.5s ease-in-out infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    .animated-title {
      animation: none !important;
    }
  }

  @keyframes text-shadow {
    0% {
      translate: 0;
      text-shadow: 0 0 0 var(--shadow1), 0 0 0 var(--shadow2), 0 0 0 var(--shadow3), 0 0 0 var(--shadow4);
    }

    20% {
      transform: translateY(calc(-1em * var(--scale)));
      text-shadow: 0 calc(0.125em * var(--scale)) 0 var(--shadow1), 0 calc(0.25em * var(--scale)) 0 var(--shadow2),
        0 calc(-0.125em * var(--scale)) 0 var(--shadow3), 0 calc(-0.25em * var(--scale)) 0 var(--shadow4);
    }

    40% {
      transform: translateY(calc(0.5em * var(--scale)));
      text-shadow: 0 calc(-0.0625em * var(--scale)) 0 var(--shadow1), 0 calc(-0.125em * var(--scale)) 0 var(--shadow2),
        0 calc(0.0625em * var(--scale)) 0 var(--shadow3), 0 calc(0.125em * var(--scale)) 0 var(--shadow4);
    }

    60% {
      transform: translateY(calc(-0.25em * var(--scale)));
      text-shadow: 0 calc(0.03125em * var(--scale)) 0 var(--shadow1), 0 calc(0.0625em * var(--scale)) 0 var(--shadow2),
        0 calc(-0.03125em * var(--scale)) 0 var(--shadow3), 0 calc(-0.0625em * var(--scale)) 0 var(--shadow4);
    }

    80% {
      translate: 0;
      text-shadow: 0 0 0 var(--shadow1), 0 0 0 var(--shadow2), 0 0 0 var(--shadow3), 0 0 0 var(--shadow4);
    }
  }
</style>
