import { remoteImageToImageData } from '$lib/utils/remote-image';
import { website } from '$lib/config';

type RemoteImage = {
  id: string;
  width: number;
  height: number;
};

export const remoteImageParser = async (img: RemoteImage) => {
  return {
    ...img,
    placeholder: await remoteImageToImageData(
      `${website.assetEndpoint}/${img.id}?fit=contain&width=30&quality=10&format=webp&upscaling=false`
    ),
  };
};
