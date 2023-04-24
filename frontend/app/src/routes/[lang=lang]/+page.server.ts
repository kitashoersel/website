import { fetchHomePageData } from '$lib/pages/home/data/home.service';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, params }) => {
  return fetchHomePageData(fetch, params.lang);
};
