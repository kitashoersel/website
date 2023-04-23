import { assert } from 'superstruct';
import { fetchGQL, type Fetcher } from '$lib/utils/graphql-client';
import { query } from '$lib/pages/home/data/home.queries';

export const fetchHomePageData = async (fetch: Fetcher, locale: string) => {
  const result = await fetchGQL(query.gql, { fetcher: fetch, variables: { locale } });
  assert(result, query.schema);
  const data = result.data.home_page.translations[0];
  return {
    introduction: data.introduction,
    institution: data.institution,
    management: data.management,
    managementPictures: data.management_pictures.map(({ directus_files_id: file }) => file),
  };
};
