<script lang="ts">
  import { LL } from '$i18n/i18n-svelte';
  import Confetti from '$lib/views/coming-soon/components/Confetti.svelte';
  import Countdown from '$lib/views/coming-soon/components/Countdown.svelte';
  import ScreenParallax from '$lib/components/common/ScreenParallax.svelte';
  import AnimatedTitle from '$lib/views/coming-soon/components/AnimatedTitle.svelte';

  export let release: Date;
  export let onFinish: VoidFunction;

  let innerWidth = 0;
</script>

<svelte:window bind:innerWidth />

<ScreenParallax rate={0.05} class="fixed h-[100svh] w-full">
  <Confetti amount={innerWidth > 800 ? 20 : 15} />
</ScreenParallax>

<div class="container m-auto grid h-[100svh] w-full place-items-center overflow-hidden">
  <ScreenParallax rate={0.12} class="pointer-events-none space-y-10">
    <div class="space-y-10 md:space-y-28">
      <Countdown {release} {onFinish} />
      <AnimatedTitle />
    </div>
    <p class="text-md mx-auto w-2/3 text-center md:max-w-2xl md:text-xl">{@html $LL.coming_soon.subtitle()}</p>
  </ScreenParallax>
</div>

<ScreenParallax rate={0.12} class="fixed h-[100svh] w-full">
  <Confetti amount={innerWidth > 800 ? 20 : 15} />
</ScreenParallax>
