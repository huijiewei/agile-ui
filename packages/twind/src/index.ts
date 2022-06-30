import { autoDarkColor, css } from 'twind';
import fontFamily from './presets/font-family';
import fontSize from './presets/font-size';
import screens from './presets/screens';
import colors from './presets/colors';
import fontWeight from './presets/font-weight';
import borderRadius from './presets/border-radius';

export type Colors = typeof colors;

export default () => {
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
      fontWeight,
      borderRadius,
    },
  };
};
