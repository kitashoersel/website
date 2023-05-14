import type { Infer } from 'superstruct';
import type { remoteImageSchema } from '$lib/pages/schemas';

export const remoteImageParser = (img: Infer<ReturnType<typeof remoteImageSchema>>) => {
  return {
    id: img.id,
    width: img.width,
    height: img.height,
    placeholder: img.placeholder,
    title: img.translations[0].title,
  };
};
