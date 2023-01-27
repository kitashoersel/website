<script lang="ts">
  import { LL } from '$i18n/i18n-svelte';
</script>

<div class="container m-auto grid h-full w-full place-items-center">
  <div>
    <h1 class="gradient-text cursor-default select-none text-center text-5xl font-bold md:text-8xl">
      {$LL.title()}
    </h1>
  </div>
</div>

<style lang="scss">
  @import './+page.scss';
</style>
