import { env } from '$env/dynamic/public';

export const config = {
  siteThemeColor: '#25334f',
  siteBackgroundColor: '#f6f6f9',
  release: new Date(2023, 2, 1, 1, 0),

  contactEmail: env.PUBLIC_CONTACT_EMAIL!,
  siteUrl: env.PUBLIC_SITE_URL!,
  cmsEndpoint: env.PUBLIC_CMS_ENDPOINT!,
  assetEndpoint: env.PUBLIC_ASSET_ENDPOINT!,
};
