const {
  inherit,
  current,
  transparent,
  black,
  white,
  gray,
  blue,
  green,
  red,
  yellow,
} = require('@twind/preset-tailwind/colors');

module.exports = {
  theme: {
    screens: { mobile: '640px', tablet: '768px', laptop: '1024px', desktop: '1280px' },
    colors: {
      inherit,
      current,
      transparent,
      black,
      white,
      gray,
      blue,
      green,
      red,
      yellow,
    },
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
      ],
      mono: ['SFMono-Regular', 'Consolas', '"Liberation Mono"', 'Menlo', 'Courier', 'monospace'],
    },
    fontSize: {
      xs: ['0.75rem', '1.25rem'],
      sm: ['0.813rem', '1.325rem'],
      base: ['0.875rem', '1.5rem'],
      lg: ['1rem', '1.75rem'],
      xl: ['1.5rem', '1.75rem'],
    },
    fontWeight: {
      thin: '200',
      light: '300',
      normal: '400',
      medium: '500',
      bold: '600',
    },
    borderRadius: {
      none: '0',
      xs: '1px',
      sm: '2px',
      DEFAULT: '4px',
      md: '5px',
      lg: '6px',
      xl: '8px',
      full: '9999px',
    },
  },
};