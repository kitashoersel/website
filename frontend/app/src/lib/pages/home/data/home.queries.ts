import { object, string, array, number } from 'superstruct';
import { gql } from '$lib/utils/graphql-client';
import { remoteImageSchema } from '$lib/pages/schemas';
import { ImageFragment } from '$lib/pages/fragments';

export const query = {
  gql: gql`
    query HomePage($locale: String) {
      home_page {
        translations(filter: { languages_code: { locale: { _eq: $locale } } }) {
          introduction
          institution
          management
          management_pictures {
            directus_files_id {
              ...Image
            }
          }
          mechterstaedt_thumbnail {
            ...Image
          }
          teutleben_thumbnail {
            ...Image
          }
        }
      }
      articles(filter: { published: { _eq: true } }, sort: ["-date_created"], limit: 2) {
        date_created
        translations(filter: { languages_code: { locale: { _eq: $locale } } }) {
          ...Article
        }
      }
    }

    fragment Article on articles_translations {
      title
      slug
      description
      read_time
      thumbnail {
        ...Image
      }
    }

    ${ImageFragment}
  `,
  schema: object({
    data: object({
      home_page: object({
        translations: array(
          object({
            introduction: string(),
            institution: string(),
            management: string(),
            management_pictures: array(object({ directus_files_id: remoteImageSchema() })),
            mechterstaedt_thumbnail: remoteImageSchema(),
            teutleben_thumbnail: remoteImageSchema(),
          })
        ),
      }),
      articles: array(
        object({
          date_created: string(),
          translations: array(
            object({
              title: string(),
              slug: string(),
              description: string(),
              read_time: number(),
              thumbnail: remoteImageSchema(),
            })
          ),
        })
      ),
    }),
  }),
};
