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
          : // eslint-disable-next-line @typescript-eslint/no-explicit-any
            key.replace(/\d+$/, (shade) => ((8 - ~~(parseInt(shade, 10) / 100) || 0.5) * 100) as any);

      return theme(section as 'colors', key);
    },
    preflight: css`
      @layer base {
        html {
          color-scheme: light;
        }
        body {
          @apply text-base;
        }
        .dark {
          color-scheme: dark;
        }
      }

      @layer utilities {
        input[type='number']::-webkit-inner-spin-button,
        input[type='number']::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type='number'] {
          -moz-appearance: textfield;
        }
      }
    `,
    theme: {
      screens,
      fontFamily,
      fontSize,
      colors,
      fontWeight,
      borderRadius,
      extend: {
        borderWidth: {
          3: '3px',
        },
        flex: {
          0: '0 1 0%',
        },
      },
    },
    variants: [
      ['opened', '&[data-opened]'],
      ['active', '&[data-active], &:active'],
      ['disabled', '&[data-loading], &[data-disabled], &[disabled]'],
      ['selected', '&[data-selected]'],
      ['focus-visible', '&[data-focus-visible], &:focus-visible'],
    ],
  } as TwindPresetConfig;
};
