import type { ImageTransformData } from '@modules/svelte-image/RemoteImage.svelte';
import { config } from '~lib/config';

export const directusImageUrl = ({ id, width, quality, format }: ImageTransformData) => {
  return `${config.assetEndpoint}/${id}?fit=contain&width=${width}&quality=${quality}&format=${format}&upscaling=false`;
};
