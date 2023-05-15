import type { ImageTransformData } from '@modules/svelte-image/RemoteImage.svelte';
import { website } from '~lib/config';

export const directusImageUrl = ({ id, width, quality, format }: ImageTransformData) => {
  return `${website.assetEndpoint}/${id}?fit=contain&width=${width}&quality=${quality}&format=${format}&upscaling=false`;
};
