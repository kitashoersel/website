<script lang="ts">
  import { onMount } from 'svelte';
  import { spring } from 'svelte/motion';

  import { LL } from '$i18n/i18n-svelte';
  import { debounce } from '$lib/utils/common/debounce';
  import Draggable from '$lib/components/common/carousel/Draggable.svelte';
  import RoundedButton from '$lib/components/common/RoundedButton.svelte';
  import Dots from '$lib/components/common/carousel/Dots.svelte';
  import Icon from '$lib/components/common/Icon.svelte';

  export let classNames = '';
  export let imageClassNames = '';

  let container: HTMLDivElement;
  let elementWidth: number;

  $: elementCount = container?.childElementCount;
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

  const scrollTo = (index: number) => {
    if (scrollIndex === 0) return handleLeftOverflow();
    if (scrollIndex === elementCount - 1) return handleRightOverflow();
    rawScrollIndex = index;
    return setScrollPosition(-elementWidth * index, index);
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
    clearInterval(autoTimer);
    autoTimer = setInterval(() => scrollTo(scrollIndex + 1), 3000) as unknown as string;
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

<div {...$$restProps} class={`${classNames} space-y-3`}>
  <div class={`${imageClassNames} overflow-hidden`} bind:clientWidth={elementWidth}>
    <Draggable
      classNames="flex [&>*]:shrink-0"
      style={`transform: translateX(${shouldAnimate ? $scrollPosition : rawScrollPosition}px);`}
      bind:element={container}
      {onDragEnd}
      {onDrag}
    >
      <slot />
    </Draggable>
  </div>
  <div class="relative">
    <div class="absolute right-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 gap-2">
      <Dots onclick={scrollTo} count={elementCount} active={rawScrollIndex} />
    </div>
    <div class="flex flex-row justify-end gap-2">
      <RoundedButton onClick={() => scrollTo(scrollIndex - 1)} label={$LL.components.prev_image()}>
        <Icon icon="arrow-left" />
      </RoundedButton>
      <RoundedButton onClick={() => scrollTo(scrollIndex + 1)} label={$LL.components.next_image()}>
        <Icon icon="arrow-right" />
      </RoundedButton>
    </div>
  </div>
</div>
