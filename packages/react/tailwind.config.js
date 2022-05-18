const plugin = require('tailwindcss/plugin');
const { default: flattenColorPalette } = require('tailwindcss/lib/util/flattenColorPalette');

module.exports = {
  experimental: {
    optimizeUniversalDefaults: true,
  },
  theme: {
    screens: { mobile: '640px', tablet: '768px', laptop: '1024px', desktop: '1280px' },
    fontFamily: {
      sans: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Helvetica',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ],
      mono: ['SFMono-Regular', 'Consolas', '"Liberation Mono"', 'Menlo', 'Courier', 'monospace'],
    },
    fontSize: {
      xs: ['0.50rem', { lineHeight: '1rem' }],
      sm: ['0.75rem', { lineHeight: '1.25rem' }],
      base: ['0.875rem', { lineHeight: '1.5rem' }],
      lg: ['1rem', { lineHeight: '1.75rem' }],
      xl: ['1.5rem', { lineHeight: '1.75rem' }],
    },
    fontWeight: {
      thin: '200',
      light: '300',
      normal: '400',
      medium: '500',
      bold: '600',
    },
    lineHeight: {
      normal: 'normal',
      none: '1',
      shorter: '1.25',
      short: '1.375',
      base: '1.5715',
      tall: '1.625',
      taller: '2',
      3: '.75rem',
      4: '1rem',
      5: '1.25rem',
      6: '1.5rem',
      7: '1.75rem',
      8: '2rem',
      9: '2.25rem',
      10: '2.5rem',
    },
    borderRadius: {
      none: '0',
      xs: '1px',
      sm: '2px',
      DEFAULT: '4px',
      lg: '6px',
      xl: '8px',
      full: '9999px',
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          spinner: (value) => ({
            borderTopColor: `${value}`,
            borderRightColor: `${value}`,
          }),
          'spinner-empty': (value) => ({
            borderLeftColor: `${value}`,
            borderBottomColor: `${value}`,
          }),
        },
        {
          values: flattenColorPalette(theme('colors')),
          type: 'color',
        }
      );
    }),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          tooltip: (value) => ({
            borderColor: `${value}`,
            backgroundColor: `${value}`,
          }),
        },
        {
          values: flattenColorPalette(theme('colors')),
          type: 'color',
        }
      );
    }),
    plugin(function ({ addUtilities, matchUtilities, theme }) {
      addUtilities({
        '.scrollbar': {
          '--scrollbar-width': '12px',
          '--scrollbar-border': '3px',
          '&::-webkit-scrollbar': {
            width: 'var(--scrollbar-width)',
            height: 'var(--scrollbar-width)',
          },
          '&::-webkit-scrollbar-thumb': {
            borderWidth: 'var(--scrollbar-border)',
            borderStyle: 'solid',
            borderColor: 'transparent',
            backgroundClip: 'padding-box',
          },
        },
        '.scrollbar-thin': {
          '--scrollbar-width': '9px',
        },
      });

      matchUtilities({
        scrollbar: (value) => ({
          '--scrollbar-width': value,
        }),
      });

      matchUtilities({
        'scrollbar-border': (value) => ({
          '--scrollbar-border': value,
        }),
      });

      matchUtilities(
        {
          'scrollbar-thumb': (value) => ({
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: value,
            },
          }),
          'scrollbar-track': (value) => ({
            '&::-webkit-scrollbar-track': {
              backgroundColor: value,
            },
          }),
          'scrollbar-corner': (value) => ({
            '&::-webkit-scrollbar-corner': {
              backgroundColor: value,
            },
          }),
        },
        {
          values: flattenColorPalette(theme('colors')),
          type: 'color',
        }
      );

      matchUtilities(
        {
          'scrollbar-track-rounded': (value) => ({
            '&::-webkit-scrollbar-track': {
              borderRadius: value,
            },
          }),
          'scrollbar-thumb-rounded': (value) => ({
            '&::-webkit-scrollbar-thumb': {
              borderRadius: value,
            },
          }),
          'scrollbar-corner-rounded': (value) => ({
            '&::-webkit-scrollbar-corner': {
              borderRadius: value,
            },
          }),
        },
        {
          values: theme('borderRadius'),
        }
      );
    }),
  ],
};
