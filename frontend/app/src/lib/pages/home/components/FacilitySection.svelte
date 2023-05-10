<script lang="ts">
  import { LL } from '$i18n/i18n-svelte';

  import HouseCard from '$lib/pages/home/components/FacilityCard.svelte';
  import MechterstaedtLogo from '$lib/assets/mechterstaedt_logo.svg';
  import TeutlebenLogo from '$lib/assets/teutleben_logo.svg';
  import type { Image } from '$lib/pages/models';

  let className = '';
  export { className as class };

  export let institution: string;
  export let mechterstaedtThumbnail: Image;
  export let teutlebenThumbnail: Image;
</script>

<section class={`${className} flex flex-col gap-10`}>
  <div class="remote-html">{@html institution}</div>

  <div class="flex flex-col gap-5 md:flex-row md:gap-14">
    <HouseCard title={$LL.mechterstaedt()} image={mechterstaedtThumbnail} href={$LL.routes.mechterstaedt()}>
      <img src={MechterstaedtLogo} alt="mechterstaedt logo" />
    </HouseCard>
    <HouseCard title={$LL.teutleben()} image={teutlebenThumbnail} href={$LL.routes.teutleben()}>
      <img src={TeutlebenLogo} alt="teutleben logo" />
    </HouseCard>
  </div>
</section>
