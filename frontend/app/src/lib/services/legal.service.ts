import { z } from 'zod';
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

const legalResponseSchema = z.object({
  data: z.object({
    legal: z
      .array(
        z.object({
          translations: z
            .array(
              z.object({
                title: z.string(),
                keywords: z.array(z.string()),
                description: z.string(),
                content: z.string(),
              })
            )
            .length(1),
        })
      )
      .length(1),
  }),
});

export const fetchLegalData = async (fetch: Fetcher, type: PageType, locale: string) => {
  const result = await fetchGQL(legalQuery, { fetcher: fetch, variables: { type, locale } });
  return legalResponseSchema.parse(result).data.legal[0].translations[0];
};
