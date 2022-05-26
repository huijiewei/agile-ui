import {
  black,
  blue,
  current,
  gray,
  green,
  inherit,
  lime,
  orange,
  red,
  rose,
  sky,
  slate,
  transparent,
  white,
  yellow,
} from '@twind/preset-tailwind/colors';
import { autoDarkColor, css } from 'twind';

export const colors = {
  inherit,
  current,
  transparent,

  black,
  white,

  slate,
  gray,
  blue,
  sky,
  green,
  lime,
  red,
  rose,
  yellow,
  orange,
};

export const presetAgile = () => {
  return {
    darkMode: 'class',
    darkColor: autoDarkColor,
    preflight: css`
      body {
        @apply text-base;
      }
    `,
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
        xs: ['0.50rem', '1rem'],
        sm: ['0.75rem', '1.25rem'],
        base: ['0.875rem', '1.5rem'],
        lg: ['1rem', '1.75rem'],
        xl: ['1.5rem', '1.75rem'],
      },
      colors,
    },
    hash: true,
  };
};
