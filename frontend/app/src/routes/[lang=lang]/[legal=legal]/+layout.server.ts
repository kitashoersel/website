import { compile } from 'mdsvex';
import rehypeSlug from 'rehype-slug';
import { fetchLegalData, type PageType } from '$lib/services/legal/legal.service';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ fetch, params, url }) => {
  const { title, description, keywords, content } = await fetchLegalData(fetch, params.legal as PageType, params.lang);
  let compiledContent = (await compile(content, { rehypePlugins: [rehypeSlug as any] }))?.code ?? '';
  compiledContent = compiledContent?.replaceAll('{{path}}', url.href);

  if (!compiledContent) {
    throw new Error("couldn't compile markdown content");
  }

  return { content: compiledContent, title, description, keywords };
};
