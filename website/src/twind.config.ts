import presetAgile from '@agile-ui/twind';
import presetAutoprefix from '@twind/preset-autoprefix';
import presetExt from '@twind/preset-ext';
import presetTailwind from '@twind/preset-tailwind';
import { css } from 'twind';
import type { TwindUserConfig } from 'twind';

export default {
  presets: [presetAutoprefix(), presetExt(), presetTailwind(), presetAgile()],
  preflight: css`
    body {
      @apply antialiased text-gray-800 bg-white overflow-y-scroll;
    }
  `,
  rules: [
    [
      'bg-gradient-radial-dot',
      { backgroundImage: 'radial-gradient(circle, var(--tw-gradient-from) 1px, var(--tw-gradient-to) 1px)' },
    ],
  ],
  ignorelist: [/^appSplash/],
} as TwindUserConfig;
