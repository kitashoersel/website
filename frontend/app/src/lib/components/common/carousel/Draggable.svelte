<script lang="ts">
  export let classNames = '';
  export let element: HTMLDivElement;
  export let onDrag: (movementX: number, movementY: number) => void = () => {};
  export let onDragEnd: () => void = () => {};
  export let onDragStart: () => void = () => {};

  let moving = false;
  let prevTouch: Touch | undefined;

  const dragStart = () => {
    moving = true;
    onDragStart();
  };

  const dragEnd = () => {
    moving = false;
    prevTouch = undefined;
    onDragEnd();
  };
</script>

<svelte:window on:mouseup={dragEnd} on:touchend={dragEnd} />

<div
  {...$$restProps}
  class={`${classNames} select-none`}
  bind:this={element}
  on:mousedown={dragStart}
  on:touchstart={dragStart}
  on:touchend={dragEnd}
  on:mousemove={({ movementX, movementY }) => {
    if (!moving) return;
    onDrag(movementX, movementY);
  }}
  on:touchmove|passive={({ touches }) => {
    if (!moving) return;
    if (prevTouch) onDrag((touches[0].pageX - prevTouch.pageX) * 1.25, (touches[0].pageY - prevTouch.pageY) * 1.25);
    [prevTouch] = touches;
  }}
>
  <slot />
</div>
