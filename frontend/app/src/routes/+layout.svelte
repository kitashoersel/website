<script lang="ts">
  import '$styles/base/foundation.scss';
</script>

<div class="w-full font-poppins text-primary-600">
  <slot />
</div>

<style lang="scss">
  @use '$THEME' as *;

  .container {
    width: 100%;
    font-family: Poppins;
    color: color(primary, 600);
  }
</style>
