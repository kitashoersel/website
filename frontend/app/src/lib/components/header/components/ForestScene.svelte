<script lang="ts">
  import ForestIllustration from '$lib/assets/forest_illustration.svg';

  let className = '';
  export { className as class };
</script>

<img
  src={ForestIllustration}
  alt="forest scene at day"
  class={`${className} pointer-events-none bg-[#99bd85] indent-[-9999px]`}
/>
