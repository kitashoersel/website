import type { BaseTranslation } from '../i18n-types.js';

const de: BaseTranslation = {
  title: 'Hallo Welt',

  mechterstaedt: 'Mechterstädt',
  teutleben: 'Teutleben',

  header: {
    home: 'Home',
  },

  footer: {
    header: 'Kindergärten der Gemeinde Hörsel',
    privacy: 'Datenschutz',
    imprint: 'Impressum',
    contact: 'Kontakt',
    copyright:
      "© {year:number} <a href='https://www.linkedin.com/in/tobias-kärst' target='_blank' rel='noopener noreferrer'>Tobias Kärst</a>. All rights reserved.",
  },

  error_404: {
    error: '404 ERROR',
    not_found: 'Seite nicht gefunden',
    not_found_desc: 'Tut uns Leid, die angeforderte Seite konnte nicht gefunden werden. 😿',
    back_home: 'Wieder nach Hause',
  },
};

export default de;
