import type { Preset } from '@twind/core';
import borderRadius from './presets/border-radius';
import colors from './presets/colors';
import fontFamily from './presets/font-family';
import fontSize from './presets/font-size';
import fontWeight from './presets/font-weight';
import screens from './presets/screens';
import preflight from './presets/preflight';
import variants from './presets/variants';
import rules from './presets/rules';
import { defineConfig } from '@twind/core';
import presetAutoprefix from '@twind/preset-autoprefix';
import presetTailwind from '@twind/preset-tailwind/base';
import presetExt from '@twind/preset-ext';
import type { TailwindTheme } from '@twind/preset-tailwind';

export * from './types/Color';
export * from './types/Tuple';

const presetAgile = (): Preset<TailwindTheme> => {
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
    preflight: preflight,
    theme: {
      screens,
      fontFamily,
      fontSize,
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
    variants: variants,
    rules: rules,
  };
};

export const twindConfig = ({ presets = [], ...userConfig }) => {
  return defineConfig({
    presets: [presetAutoprefix(), presetExt(), presetTailwind({ colors: colors }), presetAgile(), ...presets],
    ...userConfig,
  });
};
