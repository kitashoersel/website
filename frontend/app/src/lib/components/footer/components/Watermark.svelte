<script lang="ts">
  import { LL } from '$i18n/i18n-svelte';
  import Link from '$lib/components/common/Link.svelte';
</script>

<p class="text-body-sm lg:text-right lg:text-body-md">
  <span>{@html $LL.footer.watermark()}</span>
  <Link newTab href="https://www.linkedin.com/in/tobias-kärst">Tobias Kärst</Link>
</p>
