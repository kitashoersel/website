import { object, string, array } from 'superstruct';
import { gql } from '$lib/utils/common/graphql-client';

export const query = {
  gql: gql`
    query LegalPages($type: String, $locale: String) {
      legal(filter: { type: { _eq: $type } }) {
        translations(filter: { languages_code: { locale: { _eq: $locale } } }) {
          title
          description
          content
        }
      }
    }
  `,
  schema: object({
    data: object({
      legal: array(
        object({
          translations: array(
            object({
              title: string(),
              description: string(),
              content: string(),
            })
          ),
        })
      ),
    }),
  }),
};
