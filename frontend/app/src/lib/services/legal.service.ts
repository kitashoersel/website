import { assert, object, string, array, type Infer } from 'superstruct';
import { fetchGQL, gql, type Fetcher } from '$lib/utils/graphql-client';

export const legalPages = ['imprint', 'privacy'] as const;
export type PageType = (typeof legalPages)[number];

const legalQuery = gql`
  query LegalPages($type: String, $locale: String) {
    legal(filter: { type: { _eq: $type } }) {
      translations(filter: { languages_code: { locale: { _eq: $locale } } }) {
        title
        keywords
        description
        content
      }
    }
  }
`;

const LegalResponseSchema = object({
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
});

export const fetchLegalData = async (fetch: Fetcher, type: PageType, locale: string) => {
  const result = await fetchGQL(legalQuery, { fetcher: fetch, variables: { type, locale } });
  assert(result, LegalResponseSchema);
  return result.data.legal[0].translations[0];
};
