import { fetchGQL, gql, localizedQuery, type Fetcher } from '$lib/services/graphqlClient';

const privacyQuery = gql`
  query {
    privacy {
      translations(filter: { languages_code: { code: { _eq: "{{LOCALE}}" } } }) {
        id
        title
        description
        content
      }
    }
  }
`;

interface PrivacyResponse {
  id: string;
  title: string;
  description: string;
  content: string;
}

export const fetchPrivacyData = (fetch: Fetcher, lang: string) => {
  return fetchGQL<PrivacyResponse>(localizedQuery(privacyQuery, lang), 'privacy', {
    translated: true,
    fetcher: fetch,
  });
};
