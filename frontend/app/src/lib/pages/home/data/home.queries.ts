import { object, string, array, number, nullable } from 'superstruct';
import { gql } from '$lib/utils/graphql-client';
import { remoteImageSchema } from '$lib/pages/schemas';

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
              ...FileMetadata
            }
          }
          mechterstaedt_thumbnail {
            ...FileMetadata
          }
          teutleben_thumbnail {
            ...FileMetadata
          }
        }
      }
      articles(filter: { published: { _eq: true } }, sort: ["-date_created"], limit: 2) {
        date_created
        translations(filter: { languages_code: { locale: { _eq: $locale } } }) {
          title
          description
          read_time
          thumbnail {
            ...FileMetadata
          }
        }
      }
    }

    fragment FileMetadata on directus_files {
      id
      width
      height
      title
    }
  `,
  schema: object({
    data: object({
      home_page: object({
        translations: array(
          object({
            introduction: string(),
            institution: string(),
            management: string(),
            management_pictures: array(
              object({
                directus_files_id: remoteImageSchema(),
              })
            ),
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
