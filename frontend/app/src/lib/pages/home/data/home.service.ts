import { assert } from 'superstruct';
import { fetchGQL, type Fetcher } from '$lib/utils/graphql-client';
import { query } from '$lib/pages/home/data/home.queries';
import { remoteImageParser } from '$lib/pages/parser';
import type { HomePageData } from '$lib/pages/home/data/home.model';
import { slugify } from '$lib/utils/slugify';

export const fetchHomePageData = async (fetch: Fetcher, locale: string): Promise<HomePageData> => {
  const result = await fetchGQL(query.gql, { fetcher: fetch, variables: { locale } });
  assert(result, query.schema);

  const homePageData = result.data.home_page.translations[0];
  const articleData = result.data.articles;

  const [managementImages, articles, mechterstaedtThumbnail, teutlebenThumbnail] = await Promise.all([
    Promise.all(homePageData.management_pictures.map(({ directus_files_id }) => remoteImageParser(directus_files_id))),
    Promise.all(
      articleData.map(async ({ date_created, translations }) => ({
        published: date_created,
        title: translations[0].title,
        slug: slugify(translations[0].title),
        description: translations[0].description,
        readTime: translations[0].read_time,
        thumbnail: await remoteImageParser(translations[0].thumbnail),
      }))
    ),
    remoteImageParser(homePageData.mechterstaedt_thumbnail),
    remoteImageParser(homePageData.teutleben_thumbnail),
  ]);

  return {
    introduction: { introduction: homePageData.introduction, articles },
    management: { content: homePageData.management, images: managementImages },
    facilities: { institution: homePageData.institution, mechterstaedtThumbnail, teutlebenThumbnail },
  };
};
