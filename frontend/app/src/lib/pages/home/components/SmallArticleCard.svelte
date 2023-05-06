<script lang="ts">
  import type { Image } from '$lib/pages/models';
  import { shortDate } from '$lib/utils/date-transformer';
  import Link from '$lib/components/common/Link.svelte';
  import RemoteImage from '$lib/components/common/RemoteImage.svelte';
  import { page } from '$app/stores';

  export let title: string;
  export let description: string;
  export let published: string;
  export let thumbnail: Image;
  export let readTime: number;
  export let slug: string;

  const { lang } = $page.params;
</script>

<Link
  i11n
  animate={false}
  href={`/articles/${slug}`}
  class="flex w-full cursor-pointer space-x-3 transition-transform hover:scale-[1.03]"
>
  <RemoteImage
    {...thumbnail}
    imageWidths={[150, 250]}
    sizes="(max-width: 200px) 200px, 150px"
    class="h-full w-32 rounded-lg object-cover shadow-lg  lg:w-48"
  />

  <div class="flex w-full flex-col justify-between space-y-2 text-body-no lg:text-body-md">
    <div>
      <h3 class="clamp-1 font-medium">{title}</h3>
      <span class="clamp-2 text-body-sm text-primary-500">{description}</span>
    </div>
    <span class="flex justify-between text-primary-200">
      <time datetime={published}>{shortDate(published, lang)}</time>
      <span>{readTime} min</span>
    </span>
  </div>
</Link>
