import { fetchLegalData, type PageType } from '$lib/pages/legal/data/legal.service';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ fetch, params }) => {
  return fetchLegalData(fetch, params.legal as PageType, params.lang);
};
