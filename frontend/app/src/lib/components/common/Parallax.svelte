<script lang="ts">
  import { spring } from 'svelte/motion';
  import { writable } from 'svelte/store';
  import { beforeNavigate } from '$app/navigation';

  export let offset = 0;
  export let rate = 0;
  let className = '';
  export { className as class };

  const y = writable(0);

  const coord = spring<number>(-offset, { stiffness: 0.017, damping: 0.26 });

  y.subscribe((value) => {
    coord?.set(value * (-rate / 10) - offset);
  });

  beforeNavigate((e) => {
    coord?.set(-offset, { hard: true });
  });
</script>

<svelte:window bind:scrollY={$y} />

<div style:transform={`translate(0, ${$coord ?? 0}px)`} class={className}>
  <slot />
</div>
