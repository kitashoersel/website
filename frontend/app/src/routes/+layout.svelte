<script lang="typescript">
  import SvelteSeo from 'svelte-seo';
  import HeadHrefLangs from '$lib/components/core/HeadHrefLangs.svelte';
  import Fonts from '$lib/components/core/Fonts.svelte';
  import { page } from '$app/stores';

  import '~/app.scss';
</script>

<Fonts />
<HeadHrefLangs />
<SvelteSeo
  title="Open Graph Title"
  description="Description"
  keywords="Hello World Keyword Test"
  canonical={`https://${$page.url.host}${$page.url.pathname}`}
  openGraph={{
    title: 'Open Graph Title',
    description: 'Open Graph Description',
    url: 'https://www.example.com/page',
    type: 'website',
    images: [
      {
        url: 'https://www.example.com/images/og-image.jpg',
        width: 850,
        height: 650,
        alt: 'Og Image Alt',
      },
    ],
  }}
/>

<div class="antialiased w-full font-roboto bg-white text-primary-600">
  <slot />
</div>
