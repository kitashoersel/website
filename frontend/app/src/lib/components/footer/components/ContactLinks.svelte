<script lang="ts">
  import { LL } from '$i18n/i18n-svelte';
  import Link from '$lib/components/common/Link.svelte';
</script>

<ul class="sm:flex sm:gap-5 lg:justify-end">
  <li>{$LL.footer.contact()}</li>
  <li>
    <span>[</span>
    <Link i11n href={`${$LL.routes.mechterstaedt()}#${$LL.routes.contact()}`} class="text-secondary-100">
      {$LL.mechterstaedt()}
    </Link>
    <span> / </span>
    <Link i11n href={`${$LL.routes.teutleben()}#${$LL.routes.contact()}`} class="text-secondary-100">
      {$LL.teutleben()}
    </Link>
    <span>]</span>
  </li>
</ul>
