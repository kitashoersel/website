<script lang="ts">
  import HeroHeader from '$lib/components/header/HeroHeader.svelte';
  import Footer from '$lib/components/footer/Footer.svelte';
  import Seo from '$lib/components/core/SEO.svelte';

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

<HeroHeader links={headerLinks} preheader="Herzlich Willkommen bei den" header="Kindergärten der Gemeinde Hörsel" />

<main class="article-container mx-auto py-10 px-8 lg:w-3/4 lg:py-20">
  <div class="container m-auto grid h-full w-full place-items-center">
    <div>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia blanditiis corrupti quia temporibus error.
        Optio, eum vel impedit vitae quod in, ea dolor esse molestiae nobis repellat voluptatibus, ipsum perferendis?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem eaque praesentium molestiae incidunt
        assumenda sunt doloremque earum est aliquam ex nostrum dolore repellendus ea error sequi consectetur et, in
        perferendis.
      </p>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia blanditiis corrupti quia temporibus error.
        Optio, eum vel impedit vitae quod in, ea dolor esse molestiae nobis repellat voluptatibus, ipsum perferendis?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem eaque praesentium molestiae incidunt
        assumenda sunt doloremque earum est aliquam ex nostrum dolore repellendus ea error sequi consectetur et, in
        perferendis.
      </p>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia blanditiis corrupti quia temporibus error.
        Optio, eum vel impedit vitae quod in, ea dolor esse molestiae nobis repellat voluptatibus, ipsum perferendis?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem eaque praesentium molestiae incidunt
        assumenda sunt doloremque earum est aliquam ex nostrum dolore repellendus ea error sequi consectetur et, in
        perferendis.
      </p>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia blanditiis corrupti quia temporibus error.
        Optio, eum vel impedit vitae quod in, ea dolor esse molestiae nobis repellat voluptatibus, ipsum perferendis?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem eaque praesentium molestiae incidunt
        assumenda sunt doloremque earum est aliquam ex nostrum dolore repellendus ea error sequi consectetur et, in
        perferendis.
      </p>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia blanditiis corrupti quia temporibus error.
        Optio, eum vel impedit vitae quod in, ea dolor esse molestiae nobis repellat voluptatibus, ipsum perferendis?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem eaque praesentium molestiae incidunt
        assumenda sunt doloremque earum est aliquam ex nostrum dolore repellendus ea error sequi consectetur et, in
        perferendis.
      </p>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia blanditiis corrupti quia temporibus error.
        Optio, eum vel impedit vitae quod in, ea dolor esse molestiae nobis repellat voluptatibus, ipsum perferendis?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem eaque praesentium molestiae incidunt
        assumenda sunt doloremque earum est aliquam ex nostrum dolore repellendus ea error sequi consectetur et, in
        perferendis.
      </p>
    </div>
  </div>
</main>

<Footer />
