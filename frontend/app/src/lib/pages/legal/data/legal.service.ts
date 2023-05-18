import { assert } from 'superstruct';
import { fetchGQL, type Fetcher } from '$lib/utils/common/graphql-client';
import { query } from '$lib/pages/legal/data/legal.queries';
import { config } from '~lib/config';

const privacyKey = 'privacy';
const imprintKey = 'imprint';
const imprintTranslations = [imprintKey, 'impressum'] as const;
const privacyTranslations = [privacyKey, 'datenschutz'] as const;

export const legalPages = [...imprintTranslations, ...privacyTranslations] as const;
export type PageType = (typeof legalPages)[number];

export const fetchLegalData = async (fetch: Fetcher, rawType: PageType, locale: string) => {
  const type = imprintTranslations.includes(rawType) ? imprintKey : privacyKey;
  const result = await fetchGQL(query.gql, { fetch, variables: { type, locale }, endpoint: config.cmsEndpoint });
  assert(result, query.schema);
  return result.data.legal[0].translations[0];
};
