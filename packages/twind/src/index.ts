import { __DEV__ } from '@agile-ui/utils';
import { autoDarkColor, css } from 'twind';
import fontFamily from './presets/font-family';
import fontSize from './presets/font-size';
import screens from './presets/screens';
import colors from './presets/colors';

export type Colors = typeof colors;

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
      screens,
      fontFamily,
      fontSize,
      colors,
    },
    hash: !__DEV__,
  };
};
