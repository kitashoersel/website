<script lang="ts">
  import { LL } from '$i18n/i18n-svelte';
  import Confetti from '$lib/pages/coming-soon/components/Confetti.svelte';
  import Countdown from '$lib/pages/coming-soon/components/Countdown.svelte';
  import AnimatedTitle from '$lib/pages/coming-soon/components/AnimatedTitle.svelte';
  import Seo from '$lib/components/common/SEO.svelte';
  import { screenParallax } from '$lib/actions/screenParallax';

  export let release: Date;
  export let onFinish: VoidFunction;

  let innerWidth = 0;
</script>

<svelte:window bind:innerWidth />

<Seo title={$LL.coming_soon.seo_title()} description={$LL.coming_soon.subtitle()} />

<div use:screenParallax={{ rate: 0.05 }} class="parallax fixed h-[100svh] w-full">
  <Confetti amount={innerWidth > 800 ? 20 : 15} />
</div>

<div class="container m-auto grid h-[100svh] w-full place-items-center overflow-hidden">
  <div use:screenParallax={{ rate: 0.12 }} class="parallax pointer-events-none space-y-10">
    <div class="space-y-10 md:space-y-28">
      <Countdown {release} {onFinish} />
      <AnimatedTitle />
    </div>
    <p class="text-md mx-auto w-2/3 text-center md:max-w-2xl md:text-xl">{@html $LL.coming_soon.subtitle()}</p>
  </div>
</div>

<div use:screenParallax={{ rate: 0.12 }} class="parallax fixed h-[100svh] w-full">
  <Confetti amount={innerWidth > 800 ? 20 : 15} />
</div>

<style>
  @media (prefers-reduced-motion: reduce) {
    .parallax {
      transform: none !important;
    }
  }
</style>
