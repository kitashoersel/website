import { assert } from 'superstruct';
import { fetchGQL, type Fetcher } from '$lib/utils/graphql-client';
import { query } from '$lib/pages/legal/data/legal.queries';

export const legalPages = ['imprint', 'privacy'] as const;
export type PageType = (typeof legalPages)[number];

export const fetchLegalData = async (fetch: Fetcher, type: PageType, locale: string) => {
  const result = await fetchGQL(query.gql, { fetcher: fetch, variables: { type, locale } });
  assert(result, query.schema);
  return result.data.legal[0].translations[0];
};
