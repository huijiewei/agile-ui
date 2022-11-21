import presetAgile from '@agile-ui/twind';
import presetAutoprefix from '@twind/preset-autoprefix';
import presetExt from '@twind/preset-ext';
import presetTailwind from '@twind/preset-tailwind';
import { css } from '@twind/core';
import type { TwindUserConfig } from '@twind/core';

export default {
  presets: [presetAutoprefix(), presetTailwind(), presetAgile(), presetExt()],
  preflight: css`
    @layer base {
      body {
        @apply antialiased text-black bg-white overflow-y-scroll;
      }
    }
  `,
  rules: [
    [
      'bg-gradient-radial-dot',
      { backgroundImage: 'radial-gradient(circle, var(--tw-gradient-from) 1px, var(--tw-gradient-to) 1px)' },
    ],
  ],
  ignorelist: [/^appSplash/],
  theme: {
    extend: {
      colors: {
        purple: {
          50: '#F7F2FC',
          100: '#EADCFC',
          200: '#DABEFA',
          300: '#C89AFC',
          400: '#AC71F0',
          500: '#8F49DE',
          600: '#6B30AB',
          700: '#4C277D',
          800: '#331F4D',
          900: '#1C1229',
        },
      },
    },
  },
} as TwindUserConfig;
