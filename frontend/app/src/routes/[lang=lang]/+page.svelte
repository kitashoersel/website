<script lang="typescript">
  import { LL } from '$i18n/i18n-svelte';
</script>

<div class="container m-auto grid place-items-center h-full w-full">
  <div>
    <h1 class="text-5xl md:text-8xl text-center font-bold gradient-text cursor-default select-none">
      {$LL.title()}
    </h1>
  </div>
</div>

<style lang="scss">
  @import './+page.scss';
</style>
