const isDev = process.env.NODE_ENV === 'development';

export const website = {
  siteTitle: 'Kindergärten der Gemeinde Hörsel',
  siteShortTitle: 'Kindergärten Hörsel',
  siteDescription:
    'Die Kindergärten Dreikäsehoch Mechterstädt und Kleine Strolche Teutleben sind die zwei kommunalen Kindergarteneinrichtung der Gemeinde Hörsel.',
  siteKeywords: 'kindergarten,mechterstaedt,teutleben,hoersel',
  siteThemeColor: '#25334f',
  siteBackgroundColor: '#f6f6f9',

  contactEmail: 'PUBLIC_CONTACT_EMAIL',
  siteUrl: isDev ? 'http://localhost:3000' : 'http://localhost',
  cmsEndpoint: 'https://admin.kitashoersel.de',

  release: new Date(2023, 4, 1, 1, 0),
};
