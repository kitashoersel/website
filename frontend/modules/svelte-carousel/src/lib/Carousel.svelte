<script context="module" lang="ts">
  export type SwipeFunction = (dir: 'left' | 'right') => void;
</script>

<script lang="ts">
  import { onMount } from 'svelte';
  import { spring } from 'svelte/motion';
  import { debounce } from '$lib/utils/debounce';
  import Draggable from '$lib/Draggable.svelte';
  import Dots from '$lib/Dots.svelte';

  /**
   * The count of the children inside the carousel. This is optional. If not provided
   * The children count is determined via javascript. If possible, please add this field
   * because it prevents the dots flickering on page load.
   */
  export let count = 0;

  /** Enable or disable the prev and next element actions */
  export let arrows = true;

  /** Enable or disable the navigation dots */
  export let dots = true;

  /** Function to generate the aria label in case you want to translate it */
  export let dotsLabel: ((i: number) => string) | null = null;

  /** Duration for auto scroll */
  export let duration = 3000;

  /** Enable or disable the autoplay feature */
  export let autoplay = true;

  let container: HTMLDivElement;
  let elementWidth: number;

  $: elementCount = container?.childElementCount ?? count + 2;
  $: scrollPosition = spring(-elementWidth ?? 0, { stiffness: 0.04, damping: 0.26 });
  $: rawScrollPosition = -elementWidth;

  let scrollIndex = 1;
  let rawScrollIndex = 1;
  let shouldAnimate = true;
  let autoTimer: string;

  const baseScrollConfig = { hard: false, animation: true };
  const setScrollPosition = (position: number, i: number, { hard = false, animation = true } = baseScrollConfig) => {
    scrollIndex = i;
    shouldAnimate = animation;
    rawScrollPosition = position;
    scrollPosition.set(position, { hard }).then(() => (shouldAnimate = true));
  };

  const handleLeftOverflow = () => {
    rawScrollIndex = elementCount - 2;
    setTimeout(
      () => setScrollPosition(-elementWidth * (elementCount - 2), elementCount - 2, { hard: true, animation: false }),
      300
    );
  };

  const handleRightOverflow = () => {
    rawScrollIndex = 1;
    setTimeout(() => setScrollPosition(-elementWidth, 1, { hard: true, animation: false }), 300);
  };

  $: if (scrollIndex === 0) handleLeftOverflow();
  $: if (scrollIndex === elementCount - 1) handleRightOverflow();

  const swipeTo = (index: number) => {
    if (scrollIndex <= 0) return handleLeftOverflow();
    if (scrollIndex >= elementCount - 1) return handleRightOverflow();
    rawScrollIndex = index;
    return setScrollPosition(-elementWidth * index, index);
  };

  export const swipe: SwipeFunction = (dir) => {
    swipeTo(scrollIndex + (dir === 'left' ? -1 : 1));
  };

  const onDrag = async (movementX: number) => {
    const scrollThreshold = elementWidth * 0.5;
    const updateIndex = debounce((index: number) => {
      scrollIndex = index;
      rawScrollIndex = index;
    }, 100);

    await scrollPosition.update((position) => {
      const newPosition = position + movementX;

      // Prevent fast swipe for first and last element
      if (newPosition > 0 || newPosition < -(elementCount - 1) * elementWidth) {
        rawScrollPosition = position;
        return position;
      }

      // Snap to the next entry after swiping until threshold
      const spaceRight = Math.abs(Math.abs(newPosition) - (scrollIndex + 1) * elementWidth);
      const spaceLeft = Math.abs(Math.abs(newPosition) + elementWidth - scrollIndex * elementWidth);
      if (spaceLeft < scrollThreshold || spaceRight < scrollThreshold) {
        const direction = spaceLeft < scrollThreshold ? -1 : 1;
        updateIndex(scrollIndex + direction);
        rawScrollPosition = -elementWidth * (scrollIndex + direction);
        return -elementWidth * (scrollIndex + direction);
      }

      rawScrollPosition = newPosition;
      return newPosition;
    });
  };

  const onDragEnd = () => {
    setTimeout(() => {
      const deviation = Math.abs((Math.abs($scrollPosition) % elementWidth) - elementWidth);
      if (deviation > 50) {
        scrollPosition.set(-elementWidth * scrollIndex).catch(() => {});
      }
    }, 150);
  };

  onMount(() => {
    const first = container.firstElementChild!.cloneNode(true);
    const last = container.lastElementChild!.cloneNode(true);
    container.prepend(last);
    container.append(first);
  });

  $: {
    if (autoplay) {
      clearInterval(autoTimer);
      autoTimer = setInterval(() => swipeTo(scrollIndex + 1), duration) as unknown as string;
    }
  }

  $: {
    container?.childNodes.forEach((child: unknown) => {
      const element = child as HTMLElement;
      if (element.style) {
        element.style.width = `${elementWidth}px`;
      }
    });
  }
</script>

<div {...$$restProps} class={`carousel ${$$restProps.class}`}>
  <div class="elements" bind:clientWidth={elementWidth}>
    <Draggable
      class="draggable"
      style={`transform: translateX(${shouldAnimate ? $scrollPosition : rawScrollPosition}px);`}
      bind:element={container}
      {onDragEnd}
      {onDrag}
    >
      <slot />
    </Draggable>
  </div>
  <div class="controls">
    {#if dots}
      <div class="dots">
        <Dots
          onclick={(i) => swipeTo(i + 1)}
          count={elementCount - 2}
          active={rawScrollIndex - 1}
          label={dotsLabel ?? undefined}
        />
      </div>
    {/if}

    {#if arrows}
      <div class="buttons">
        <slot name="button-left" />
        <slot name="button-right" />
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
  .carousel {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .elements {
    overflow: hidden;
    border-radius: 0.5rem;

    :global(.draggable) {
      display: flex;

      :global(> *) {
        flex-shrink: 0;
      }
    }
  }

  .controls {
    position: relative;
    min-height: 25px;

    .buttons,
    .dots {
      display: flex;
      gap: 0.5rem;
    }

    .buttons {
      justify-content: flex-end;
    }

    .dots {
      position: absolute;
      top: 50%;
      right: 50%;
      transform: translate(50%, -50%);
    }
  }
</style>
