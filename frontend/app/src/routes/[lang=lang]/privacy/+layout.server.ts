import { fetchPrivacyData } from '$lib/services/legal/privacy.service';
import { compile } from 'mdsvex';
import rehypeSlug from 'rehype-slug';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ fetch, params, url }) => {
  const { title, description, content: rawContent } = await fetchPrivacyData(fetch, params.lang);
  const compiledContent = await compile(rawContent, { rehypePlugins: [rehypeSlug] });
  const content = compiledContent?.code.replaceAll('{{path}}', url.href);
  return { content, title, description };
};
