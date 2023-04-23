import { object, string, array, number } from 'superstruct';
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
            }
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
                }),
              })
            ),
          })
        ),
      }),
    }),
  }),
};
