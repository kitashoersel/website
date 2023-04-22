import type { PageServerLoad } from './$types';

export const load = (async ({ fetch }) => {
  const placeholder = await fetch(
    'https://admin.kitashoersel.de/assets/220ff0e9-1c8e-473f-83ef-b599b9256e09/our_management.webp?fit=contain&width=30&quality=10&format=webp&upscaling=false'
  );
  const buffer = Buffer.from(await placeholder.arrayBuffer());

  return {
    image: {
      key: '220ff0e9-1c8e-473f-83ef-b599b9256e09',
      height: 713,
      width: 1080,
      placeholder: `data:image/webp;base64,${buffer.toString('base64')}`,
    },
  };
}) satisfies PageServerLoad;
