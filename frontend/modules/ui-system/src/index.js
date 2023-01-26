const base = require('./base');

const main = ({ addBase, addComponents, addUtilities, config, postcss }) => {
  addBase(base);
  addComponents({
    '.hello': {
      color: 'red',
    },
  });
};

module.exports = require('tailwindcss/plugin')(main);
