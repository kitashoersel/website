/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  plugins: [require('@tailwindcss/typography'), require('../modules/ui-system')],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        transparent: '#00000000',
        primary: {
          100: '#9aa4b9',
          200: '#5d6d8e',
          500: '#354972',
          600: '#25334f',
          700: '#1e293f',
        },
        secondary: {
          100: '#fdebe8',
          200: '#fbcdc5',
          500: '#f9b9ae',
          600: '#f79b8b',
          700: '#de8c7d',
        },
        success: {
          100: '#f0faf2',
          200: '#d1f1d9',
          500: '#a3e2b3',
          600: '#85d999',
          700: '#66cf80',
        },
        danger: {
          100: '#f9ccdf',
          200: '#f399c0',
          500: '#ec66a0',
          600: '#e63381',
          700: '#e00061',
        },
        neutral: {
          0: '#ffffff',
          100: '#f6f6f9',
        },
      },
      fontSize: {
        'body-sm': '0.8125rem',
        'body-no': '0.9375rem',
        'body-md': '1.0625rem',
        'body-lg': '1.25rem',
        'body-xl': '1.5rem',
        'header-sm': '1.5rem',
        'header-no': '2.0625rem',
        'header-md': '2.5rem',
        'header-lg': '3.125rem',
        'header-xl': '3.75rem',
      },
      fontFamily: {
        poppins: 'Poppins',
      },
    },
  },
};
