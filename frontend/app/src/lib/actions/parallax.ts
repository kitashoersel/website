import type { Action } from 'svelte/types/runtime/action';
import { spring } from 'svelte/motion';
import { beforeNavigate } from '$app/navigation';

interface ParallaxOptions {
  offset: number;
  rate: number;
}

const defaultSettings = (payload: Partial<ParallaxOptions> = {}): ParallaxOptions => {
  return { offset: 0, rate: 0, ...payload };
};

export const parallax: Action<HTMLElement, Partial<ParallaxOptions>> = (node, payload) => {
  let settings = defaultSettings(payload);
  let coord = spring<number>(-settings.offset, { stiffness: 0.017, damping: 0.26 });

  const scroll = () => coord?.set(window.scrollY * (-settings.rate / 10) - settings.offset);

  coord.subscribe((value) => (node.style.transform = `translate(0, ${value}px)`));
  window.addEventListener('scroll', scroll);
  beforeNavigate(() => coord?.set(-settings.offset, { hard: true }));

  return {
    destroy: () => {
      window.removeEventListener('scroll', scroll);
    },
    update: (updatePayload) => {
      settings = defaultSettings(updatePayload);
      coord = spring<number>(-settings.offset, { stiffness: 0.017, damping: 0.26 });
    },
  };
};
