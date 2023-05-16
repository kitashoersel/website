<script lang="ts">
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

  const mousemove = ({ movementX, movementY }: MouseEvent) => {
    if (!moving) return;
    onDrag(movementX, movementY);
  };

  const touchmove = ({ touches }: TouchEvent) => {
    if (!moving) return;
    if (prevTouch) onDrag((touches[0].pageX - prevTouch.pageX) * 1.25, (touches[0].pageY - prevTouch.pageY) * 1.25);
    [prevTouch] = touches;
  };
</script>

<svelte:window on:mouseup={dragEnd} on:touchend={dragEnd} />

<div
  {...$$restProps}
  class={`draggable ${$$restProps.class}`}
  bind:this={element}
  on:mousedown={dragStart}
  on:touchstart={dragStart}
  on:touchend={dragEnd}
  on:mousemove={mousemove}
  on:touchmove|passive={touchmove}
>
  <slot />
</div>

<style>
  .draggable {
    user-select: none;
  }
</style>
