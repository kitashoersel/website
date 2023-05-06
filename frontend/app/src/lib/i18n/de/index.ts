import type { BaseTranslation } from '../i18n-types.js';

const de: BaseTranslation = {
  mechterstaedt: 'Mechterstädt',
  teutleben: 'Teutleben',

  show_more: 'Mehr anzeigen',

  components: {
    next_image: 'Nächstes Bild anzeigen',
    prev_image: 'Vorheriges Bild anzeigen',
    show_x_image: '{index:number} Bild anzeigen',
  },

  coming_soon: {
    title: 'In Kürze <br /> verfügbar',
    subtitle: 'Zum 40 und 50 Jubiläum der Kindergärten wollen wir unsere neue Website schon bald gebührend feiern!',
  },

  header: {
    home: 'Home',
    pretitle: 'Herzlich Willkommen bei den',
    title: 'Kindergärten der Gemeinde Hörsel',
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

  home_page: {
    news: 'Aktuelles von uns',
  },
};

export default de;
