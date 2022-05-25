import { autoDarkColor, Preset } from 'twind';

const presetAgile = {
  darkColor: autoDarkColor,
  preflight: {
    html: { fontFamily: `theme(fontFamily.sans)` },
    body: {
      fontSize: '0.875rem',
      lineHeight: '1.5rem',
    },
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
      xs: ['0.50rem', '1rem'],
      sm: ['0.75rem', '1.25rem'],
      base: ['0.875rem', '1.5rem'],
      lg: ['1rem', '1.75rem'],
      xl: ['1.5rem', '1.75rem'],
    },
  },
};

export default (): Preset => {
  return presetAgile;
};
