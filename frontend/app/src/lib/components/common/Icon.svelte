<script lang="ts">
  let className = '';
  export { className as class };
  export let title: string | null = null;
  export let iconPath = '/icons/icons.svg';
  export let icon: string;
</script>

<svg class={className} class:icon {...$$props}>
  <title>{title ?? icon}</title>
  <use xlink:href={`${iconPath}#${icon}`} />
</svg>

<style global>
  .icon {
    display: inline-block;
    width: 1.75rem;
    height: 1.75rem;
    stroke-width: 0;
    stroke: currentColor;
    fill: currentColor;
  }
</style>
