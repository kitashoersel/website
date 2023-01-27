<script lang="ts">
  // eslint-disable-next-line svelte/valid-compile
  export let data = {
    content: '',
  };
</script>

<div>{@html data.content}</div>
