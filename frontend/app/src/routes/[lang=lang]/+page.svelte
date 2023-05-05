<script lang="ts">
  import HeroHeader from '$lib/components/header/HeroHeader.svelte';
  import Footer from '$lib/components/footer/Footer.svelte';
  import Seo from '$lib/components/core/SEO.svelte';
  import Mounted from '$lib/components/core/Mounted.svelte';
  import { LL } from '$i18n/i18n-svelte';
  import IntroductionSection from '$lib/pages/home/components/IntroductionSection.svelte';
  import ManagementSection from '$lib/pages/home/components/ManagementSection.svelte';

  import type { PageData } from './$types';

  import '$lib/pages/home/styles/remote-content.scss';

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
  <HeroHeader links={headerLinks} preheader={$LL.header.pretitle()} header={$LL.header.title()} />

  <main class="relative z-20 space-y-20 py-10 lg:space-y-32 lg:py-20">
    <IntroductionSection {...data.introduction} class="page px-8 lg:w-3/4" />
    <ManagementSection {...data.management} class="page px-8 lg:w-3/4" />
  </main>

  <div class="mb-10" />

  <Footer />
</Mounted>
