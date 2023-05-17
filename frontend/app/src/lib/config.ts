export const config = {
  siteThemeColor: '#25334f',
  siteBackgroundColor: '#f6f6f9',
  release: new Date(2023, 2, 1, 1, 0),

  contactEmail: 'PUBLIC_CONTACT_EMAIL',
  siteUrl: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://kitashoersel.de',
  cmsEndpoint: 'https://admin.kitashoersel.de',
  assetEndpoint: 'https://admin.kitashoersel.de/assets',
};
