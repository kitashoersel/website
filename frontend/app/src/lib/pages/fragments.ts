import { gql } from '$lib/utils/common/graphql-client';

export const ImageFragment = gql`
  fragment Image on directus_files {
    id
    width
    height
    placeholder
    translations(filter: { languages_code: { locale: { _eq: $locale } } }) {
      title
    }
  }
`;

export const ArticleFragment = gql`
  fragment Article on articles_translations {
    title
    slug
    description
    content
    read_time
    thumbnail {
      ...Image
    }
  }
`;
