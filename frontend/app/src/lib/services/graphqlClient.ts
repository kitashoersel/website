import { website } from '$lib/config';
import { isLocale } from '$lib/i18n/i18n-util';
import type { Locales } from '$lib/i18n/i18n-types';

export const gql = String.raw;

interface OptionalParams {
  variables?: unknown;
  fetcher?: Fetcher;
}

export type Fetcher = (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>;

export const localizedQuery = (query: string, locale: string | Locales) => {
  if (!isLocale(locale)) {
    throw new Error('locale does not exist');
  }
  return query;
};

export const fetchGQL = async (query: string, params?: OptionalParams) => {
  const fetcher = params?.fetcher ?? fetch;
  const res = await fetcher(`${website.cmsEndpoint}/graphql`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query,
      variables: params?.variables || {},
    }),
  });

  if (!res.ok) {
    throw Error(await res.text());
  }

  return res.json();
};
