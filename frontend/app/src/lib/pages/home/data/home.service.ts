import { assert } from 'superstruct';
import { fetchGQL, type Fetcher } from '$lib/utils/common/graphql-client';
import { query } from '$lib/pages/home/data/home.queries';
import type { HomePageData } from '$lib/pages/home/data/home.model';
import { remoteImageParser } from '$lib/pages/parser';
import { config } from '$lib/config';

export const fetchHomePageData = async (fetch: Fetcher, locale: string): Promise<HomePageData> => {
  const result = await fetchGQL(query.gql, { fetch, variables: { locale }, endpoint: config.cmsEndpoint });
  assert(result, query.schema);

  const homePageData = result.data.home_page.translations[0];
  const articleData = result.data.articles;

  const managementImages = homePageData.management_pictures.map(({ directus_files_id }) =>
    remoteImageParser(directus_files_id)
  );

  const articles = articleData.map(({ date_created, translations }) => ({
    published: date_created,
    title: translations[0].title,
    slug: translations[0].slug,
    description: translations[0].description,
    readTime: translations[0].read_time,
    thumbnail: remoteImageParser(translations[0].thumbnail),
  }));

  const mechterstaedtThumbnail = remoteImageParser(homePageData.mechterstaedt_thumbnail);
  const teutlebenThumbnail = remoteImageParser(homePageData.teutleben_thumbnail);

  return {
    introduction: { introduction: homePageData.introduction, articles },
    management: { content: homePageData.management, images: managementImages },
    facilities: { institution: homePageData.institution, mechterstaedtThumbnail, teutlebenThumbnail },
  };
};
