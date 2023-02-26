<svelte:head>
  <style lang="scss">
    $sizes: (
      'poppins-latin-400-normal': 400,
      'poppins-latin-600-normal': 600,
      'poppins-latin-700-normal': 700,
    );

    @each $font, $weight in $sizes {
      @font-face {
        font-family: 'Poppins';
        font-style: normal;
        font-display: swap;
        font-weight: $weight;
        src: url('/fonts/poppins/#{$font}.woff2') format('woff2'), url('/fonts/poppins/#{$font}.woff') format('woff');
      }
    }
  </style>
</svelte:head>
