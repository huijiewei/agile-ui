import { css, TwindPresetConfig } from 'twind';
import borderRadius from './presets/border-radius';
import colors from './presets/colors';
import fontFamily from './presets/font-family';
import fontSize from './presets/font-size';
import fontWeight from './presets/font-weight';
import screens from './presets/screens';

export * from './types/Color';
export * from './types/Tuple';

export default () => {
  return {
    darkMode: 'class',
    darkColor: (section, key, { theme }) => {
      key =
        key == 'white'
          ? 'black'
          : key == 'black'
          ? 'white'
          : key.replace(/\d+$/, (shade) => ((8 - ~~(parseInt(shade, 10) / 100) || 0.5) * 100) as any);

      return theme(section as 'colors', key);
    },
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
  } as TwindPresetConfig;
};
