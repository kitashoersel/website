/* eslint-disable no-restricted-syntax */

import { imagetools } from 'vite-imagetools';
import { resize, format, setMetadata, metadataFormat, resolveConfigs, type TransformFactory } from 'imagetools-core';

const placeholderTransformation: TransformFactory = (cfg, ctx) => {
  const r = resize({ width: cfg.lqip }, ctx)!;
  const f = format({ format: 'webp', quality: '20' }, ctx)!;

  return async (image) => {
    const img = await f(await r(image));
    const buffer = await img.toBuffer();
    setMetadata(img, 'base64', `data:image/webp;base64,${buffer.toString('base64')}`);
    return img;
  };
};

function main(overrides = {}) {
  return imagetools({
    defaultDirectives: () => new URLSearchParams('width=480;1024;1920&format=avif;webp;jpg'),
    extendTransforms: (builtins) => [...builtins, placeholderTransformation],
    extendOutputFormats: (builtinOutputFormats) => ({
      ...builtinOutputFormats,
      run: () => metadataFormat(['format', 'src', 'width', 'height', 'base64']),
    }),
    resolveConfigs: (entries, formats) => {
      if (entries.findIndex((i) => i[0] === 'run') > -1) {
        const idx = entries.findIndex((i) => i[0] === 'lqip');
        const lqip = idx > -1 ? parseInt(entries.splice(idx, 1)[0][1][0], 10) : 16;
        const merge = new Map();
        for (const [key, val] of entries) merge.set(key, val);
        return [...resolveConfigs([...merge], formats), ...(lqip ? [{ lqip }] : [])] as Record<
          string,
          string | string[]
        >[];
      }
      return resolveConfigs(entries, formats);
    },
    ...overrides,
  });
}

export { main as imagetools, placeholderTransformation as lqip };
