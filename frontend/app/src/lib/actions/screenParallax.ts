import type { Action } from 'svelte/action';
import { spring } from 'svelte/motion';

interface ParallaxOptions {
  rate: number;
}

const defaultSettings = (payload: Partial<ParallaxOptions> = {}): ParallaxOptions => {
  return { rate: 0.05, ...payload };
};

export const screenParallax: Action<HTMLElement, Partial<ParallaxOptions>> = (node, payload) => {
  let settings = defaultSettings(payload);
  const coord = spring({ x: 0, y: 0 }, { stiffness: 0.017, damping: 0.26 });
  const mobileCoord = spring({ x: 0, y: 0 }, { stiffness: 0.017, damping: 0.26 });

  let { innerHeight, innerWidth } = window;

  node.style.inset = '0px';
  node.style.transformOrigin = 'center';

  coord.subscribe(({ x, y }) => {
    node.style.transform = `translate(${x}px, ${y}px) rotateX(0deg) rotateY(0deg)`;
  });

  mobileCoord.subscribe(({ x, y }) => {
    node.style.transform = `translate(0px, 0px) rotateX(${x}deg) rotateY(${y}deg)`;
  });

  const mousemove = async (event: MouseEvent) => {
    await coord.set({
      x: (event.clientX - innerWidth / 2) * settings.rate,
      y: (event.clientY - innerHeight / 2) * settings.rate,
    });
  };

  const deviceorientation = async (event: DeviceOrientationEvent) => {
    if (!event.alpha || !event.beta || !event.gamma) return;

    const x = Math.round((event.beta - 45) * -1);
    const y = Math.round(event.gamma);
    await Promise.all([mobileCoord.set({ x, y }), coord.set({ x, y })]);
  };

  const resize = () => {
    innerHeight = window.innerHeight;
    innerWidth = window.innerWidth;
  };

  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', mousemove);
  window.addEventListener('deviceorientation', deviceorientation);

  return {
    destroy: () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', mousemove);
      window.removeEventListener('deviceorientation', deviceorientation);
    },
    update: (updatePayload) => {
      settings = defaultSettings(updatePayload);
    },
  };
};
