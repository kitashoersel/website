<script lang="ts">
  import HeroHeader from '$lib/components/header/HeroHeader.svelte';
  import Footer from '$lib/components/footer/Footer.svelte';
  import Seo from '$lib/components/core/SEO.svelte';
  import Mounted from '$lib/components/core/Mounted.svelte';
  import RemoteImage from '$lib/components/common/RemoteImage.svelte';
  import { LL } from '$i18n/i18n-svelte';
  import IntroductionSection from '$lib/pages/home/components/IntroductionSection.svelte';
  import Carousel from '$lib/components/core/carousel/Carousel.svelte';

  import type { PageData } from './$types';

  export let data: PageData;

  const headerLinks = [
    { href: '/', label: 'Home' },
    { href: '/mechterstaedt', label: 'Mechterstädt' },
    { href: '/teutleben', label: 'Teutleben' },
  ];
</script>

<Seo
  title="Kindergärten der Gemeinde Hörsel"
  description="Die Kindergärten Dreikäsehoch Mechterstädt und Kleine Strolche Teutleben sind die zwei kommunalen Kindergarteneinrichtung der Gemeinde Hörsel."
/>

<Mounted>
  <!-- <HeroHeader links={headerLinks} preheader={$LL.header.pretitle()} header={$LL.header.title()} /> -->

  <main class="page relative z-20 px-8 py-10 lg:w-3/4 lg:py-20">
    <!-- <IntroductionSection {...data.introduction} /> -->
    <Carousel classNames="w-64 lg:w-96" imageClassNames="rounded-lg">
      {#each [...data.management.images] as image}
        <RemoteImage {...image} sizes="(max-width: 1000px) 600px, 1200px" class="h-full w-64 lg:w-96" />
      {/each}
    </Carousel>
  </main>

  <Footer />
</Mounted>
