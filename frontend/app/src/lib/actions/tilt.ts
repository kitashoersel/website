import type { Action } from 'svelte/action';

interface TiltOptions {
  scale: number;
  max: number;
  reverse: boolean;
}

const TRANSITION_MS = 100;

const defaultSettings = (payload: Partial<TiltOptions> = {}): TiltOptions => {
  return { scale: 1, max: 15, reverse: false, ...payload };
};

export const tilt: Action<HTMLElement, Partial<TiltOptions>> = (node, payload) => {
  let settings = defaultSettings(payload);
  let reverseFactor = settings.reverse ? -1 : 1;
  let transitionId: ReturnType<typeof setTimeout>;
  let rect: DOMRect = node.getBoundingClientRect();

  let gyroscopeSamples = 10;
  let gammaZero: number | null = null;
  let betaZero: number | null = null;

  const animate = (clientX: number, clientY: number) => {
    const tiltX = (reverseFactor * (settings.max - clientX * settings.max * 2)).toFixed(2);
    const tiltY = (reverseFactor * (clientY * settings.max * 2 - settings.max)).toFixed(2);

    node.style.transform =
      `perspective(${1000}px) ` +
      `rotateX(${tiltY}deg) ` +
      `rotateY(${tiltX}deg) ` +
      `scale3d(${Array(3).fill(settings.scale).join(', ')})`;
  };

  const transition = (transform?: VoidFunction) => {
    clearTimeout(transitionId);
    node.style.transition = `${TRANSITION_MS}ms`;
    transitionId = setTimeout(() => (node.style.transition = '0s'), TRANSITION_MS);
    if (transform) transform();
  };

  const mousemove = ({ clientX, clientY }: MouseEvent) => {
    animate((clientX - rect.left) / rect.width, (clientY - rect.top) / rect.height);
  };

  const deviceorientation = (event: Event) => {
    const { alpha, beta, gamma } = event as DeviceOrientationEvent;
    if (!alpha || !beta || !gamma) return;

    if (gyroscopeSamples > 0) {
      gammaZero = gammaZero === null ? gamma : (gamma + gammaZero) / 2;
      betaZero = betaZero === null ? gamma : (betaZero + betaZero) / 2;
      gyroscopeSamples -= 1;
    }

    const angleX = gamma - (-45 + gammaZero!);
    const angleY = beta - (-45 + betaZero!);
    const clientX = angleX / (90 / rect.width) + rect.left;
    const clientY = angleY / (90 / rect.height) + rect.top;
    const x = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
    const y = Math.min(Math.max((clientY - rect.top) / rect.height, 0), 1);

    animate(x, y);
  };

  const mouseleave = () => {
    transition(() => (node.style.transform = `perspective(${1000}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`));
  };

  const mouseenter = () => transition();

  const recalculateBounding = () => (rect = node.getBoundingClientRect());

  node.addEventListener('mousemove', mousemove);
  node.addEventListener('mouseleave', mouseleave);
  node.addEventListener('mouseenter', mouseenter);
  window.addEventListener('deviceorientation', deviceorientation, true);
  window.addEventListener('scroll', recalculateBounding);

  return {
    destroy: () => {
      node.removeEventListener('mousemove', mousemove);
      node.removeEventListener('mouseleave', mouseleave);
      node.removeEventListener('mouseenter', mouseenter);
      window.removeEventListener('deviceorientation', deviceorientation);
      window.removeEventListener('scroll', recalculateBounding);
    },
    update: (updatePayload) => {
      settings = defaultSettings(updatePayload);
      reverseFactor = settings.reverse ? -1 : 1;
      recalculateBounding();
    },
  };
};
