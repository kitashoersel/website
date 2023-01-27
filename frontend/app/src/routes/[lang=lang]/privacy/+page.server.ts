/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { compile } from 'mdsvex';
import type { PageServerLoad } from './$types';

interface Imprint {
  id: number;
  content: string;
  title: string;
  description: string;
}

export const load: PageServerLoad = async ({ fetch }) => {
  const res = await fetch(`https://admin.tobias-kaerst.de/items/imprint`);
  const { id, content, title, description }: Imprint = (await res.json()).data;
  const compiledContent = await compile(content);

  return {
    id,
    content: compiledContent?.code,
    title,
    description,
  };
};
