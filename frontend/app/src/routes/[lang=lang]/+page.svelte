<script lang="ts">
  import { get } from 'svelte/store';
  import { LL } from '$i18n/i18n-svelte';

  import HeroHeader from '$lib/components/header/HeroHeader.svelte';
  import Footer from '$lib/components/footer/Footer.svelte';
  import Seo from '$lib/components/common/SEO.svelte';
  import IntroductionSection from '$lib/pages/home/components/IntroductionSection.svelte';
  import ManagementSection from '$lib/pages/home/components/ManagementSection.svelte';
  import HousesSection from '$lib/pages/home/components/FacilitySection.svelte';
  import type { PageData } from './$types';

  import '$lib/pages/home/styles/remote-content.scss';

  export let data: PageData;

  const links = [
    { href: '/', label: get(LL).routes.home() },
    { href: get(LL).routes.mechterstaedt(), label: get(LL).mechterstaedt() },
    { href: get(LL).routes.teutleben(), label: get(LL).teutleben() },
  ];
</script>

<Seo />
<HeroHeader {links} preheader={$LL.header.pretitle()} header={$LL.header.title()} />
<main class="relative z-20 mb-10 space-y-20 py-10 lg:space-y-40 lg:py-20">
  <IntroductionSection {...data.introduction} class="page px-8 lg:w-3/4" />
  <ManagementSection {...data.management} class="page px-8 lg:w-3/4" />
  <HousesSection {...data.facilities} class="page px-8 lg:w-3/4" />
</main>
<Footer />
