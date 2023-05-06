import { object, string, array, number, nullable } from 'superstruct';
import { gql } from '$lib/utils/graphql-client';

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
              width
              height
              id
              title
            }
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
            id
            width
            height
            title
          }
        }
      }
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
                directus_files_id: object({
                  width: number(),
                  height: number(),
                  id: string(),
                  title: nullable(string()),
                }),
              })
            ),
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
              thumbnail: object({
                width: number(),
                height: number(),
                id: string(),
                title: nullable(string()),
              }),
            })
          ),
        })
      ),
    }),
  }),
};
