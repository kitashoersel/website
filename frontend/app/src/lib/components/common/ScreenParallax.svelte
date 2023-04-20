<script lang="ts">
  import { spring } from 'svelte/motion';

  export let rate = 0.05;
  let className = '';
  export { className as class };

  let innerHeight = 0;
  let innerWidth = 0;

  const coord = spring({ x: 0, y: 0 }, { stiffness: 0.017, damping: 0.26 });
  const mobileCoord = spring({ x: 0, y: 0 }, { stiffness: 0.017, damping: 0.26 });

  export const mousemove = async (event: MouseEvent) => {
    await coord.set({ x: (event.clientX - innerWidth / 2) * rate, y: (event.clientY - innerHeight / 2) * rate });
  };

  const deviceorientation = async (event: DeviceOrientationEvent) => {
    if (!event.alpha || !event.beta || !event.gamma) return;

    const x = Math.round((event.beta - 45) * -1);
    const y = Math.round(event.gamma);
    await Promise.all([mobileCoord.set({ x, y }), coord.set({ x, y })]);
  };
</script>

<svelte:window bind:innerHeight bind:innerWidth on:mousemove={mousemove} on:deviceorientation={deviceorientation} />

<div
  class="{className} parallax-screen inset-0 origin-center"
  style:transform={`translate(${$coord.x}px, ${$coord.y}px) rotateX(${$mobileCoord.x}deg) rotateY(${$mobileCoord.y}deg)`}
>
  <slot />
</div>

<style>
  @media (prefers-reduced-motion: reduce) {
    .parallax-screen {
      transform: none !important;
    }
  }
</style>
