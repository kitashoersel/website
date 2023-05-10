import type { Image } from '$lib/pages/models';

export interface Article {
  published: string;
  title: string;
  slug: string;
  description: string;
  readTime: number;
  thumbnail: Image;
}

export interface HomePageData {
  introduction: { introduction: string; articles: Article[] };
  management: { content: string; images: Image[] };
  facilities: {
    institution: string;
    mechterstaedtThumbnail: Image;
    teutlebenThumbnail: Image;
  };
}
