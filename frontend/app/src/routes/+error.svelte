<script lang="ts">
  import { LL } from '$i18n/i18n-svelte';
  import errorIllustration from '$lib/assets/error_illustration.svg';
  import Link from '$lib/components/common/Link.svelte';
  import Seo from '$lib/components/common/SEO.svelte';
  import Icon from '$lib/components/common/Icon.svelte';
</script>

<Seo title={$LL.error_404.error()} description={$LL.error_404.not_found()} keywords="error,not found,unavailable" />

<div class="page flex h-[100svh] flex-col-reverse justify-center gap-5 lg:flex-row lg:items-center">
  <div class="flex flex-col items-center text-center lg:items-start lg:text-start">
    <div class="mb-3 text-body-md font-medium text-secondary-700 lg:text-body-lg">
      {$LL.error_404.error()}
    </div>
    <h1 class="mb-5 text-header-md font-bold lg:text-header-xl">{$LL.error_404.not_found()}</h1>
    <p class="mb-5 text-body-no lg:mb-14 lg:text-body-lg">
      {$LL.error_404.not_found_desc()}
    </p>
    <div class="flex items-center gap-5 text-secondary-700">
      <Link href="/" class="text-body-no  before:bg-secondary-700 lg:text-body-lg">
        <span>{$LL.error_404.back_home()}</span>
      </Link>
      <Icon icon="arrow-double-right" class="animate-bounce-right" />
    </div>
  </div>

  <div class="flex w-full justify-center md:mx-auto md:w-2/3 lg:h-full lg:w-[50%]">
    <img
      src={errorIllustration}
      alt="women scared of exploding computer"
      title="error dog"
      class="h-full"
      loading="lazy"
    />
  </div>
</div>
