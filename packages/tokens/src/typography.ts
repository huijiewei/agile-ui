export const fonts = {
  body: `-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
  mono: `"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace !default`,
};

export const fontSizes = {
  xs: '0.50rem',
  sm: '0.75rem',
  md: '0.875rem',
  lg: '1rem',
  xl: '1.5rem',
};

export type Size = keyof typeof fontSizes;

export const fontWeights = {
  thin: '200',
  light: '300',
  normal: '400',
  medium: '500',
  bold: '600',
};

export const lineHeights = {
  normal: 'normal',
  none: '1',
  shorter: '1.25',
  short: '1.375',
  base: '1.5715',
  tall: '1.625',
  taller: '2',
  '3': '.75rem',
  '4': '1rem',
  '5': '1.25rem',
  '6': '1.5rem',
  '7': '1.75rem',
  '8': '2rem',
  '9': '2.25rem',
  '10': '2.5rem',
};
