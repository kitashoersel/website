<script lang="ts">
  import HeroHeader from '$lib/components/header/HeroHeader.svelte';
  import Footer from '$lib/components/footer/Footer.svelte';
  import Seo from '$lib/components/core/SEO.svelte';
  import Mounted from '$lib/components/common/Mounted.svelte';
  import RemoteImage from '$lib/components/common/RemoteImage.svelte';
  import { LL } from '$i18n/i18n-svelte';
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
  <HeroHeader links={headerLinks} preheader={$LL.header.pretitle()} header={$LL.header.title()} />

  <main class="article-container relative z-20 mx-auto px-8 py-10 lg:w-3/4 lg:py-20">
    <div class="container m-auto grid h-full w-full place-items-center">
      <div>
        <RemoteImage {...data.image} sizes="(max-width: 1000px) 600px, 1200px" />
      </div>
    </div>
  </main>

  <Footer />
</Mounted>
