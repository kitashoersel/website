<script lang="ts">
  import { LL } from '$i18n/i18n-svelte';
  import Link from '$lib/components/common/Link.svelte';
  import type { Article } from '$lib/pages/home/data/home.model';
  import SmallArticleCard from '$lib/pages/home/components/SmallArticleCard.svelte';

  let className = '';
  export { className as class };
  export let introduction: string;
  export let articles: Article[];
</script>

<section class={`${className} intro-section space-y-4 lg:grid lg:space-y-0`}>
  <div class="remote-html space-y-6 pb-3 lg:text-right">{@html introduction}</div>

  <div class="mx-auto hidden h-full w-[2px] bg-primary-100 bg-opacity-50 lg:block" />

  <div class="grid items-center space-y-3">
    <div class="flex items-center justify-between">
      <h3 class="text-body-no font-medium uppercase lg:text-body-md">
        {@html $LL.home_page.news()}
      </h3>
      <Link i11n href="" animate={false} class="text-body-sm text-primary-600 before:bg-secondary-100 lg:text-body-no">
        {@html $LL.show_more()}
      </Link>
    </div>

    <div class="flex flex-col gap-4">
      {#each articles as article}
        <SmallArticleCard {...article} />
      {/each}
    </div>
  </div>
</section>

<style>
  .intro-section {
    grid-template-columns: 1fr 4rem 1fr;
  }
</style>
