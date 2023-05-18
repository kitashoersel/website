export const gql = String.raw;

interface OptionalParams {
  endpoint: string;
  variables?: unknown;
  fetch?: Fetcher;
}

export type Fetcher = (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>;

const simpleHash = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash &= hash;
  }
  return new Uint32Array([hash])[0].toString(36);
};

export const fetchGQL = async (query: string, params?: OptionalParams) => {
  const fetcher = params?.fetch ?? fetch;
  const id = simpleHash(query + JSON.stringify(params?.variables ?? {}));

  const res = await fetcher(`${params?.endpoint}${id ? `?req=${id}` : ''}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables: params?.variables || {} }),
  });

  if (!res.ok) {
    throw Error(await res.text());
  }

  return res.json();
};
