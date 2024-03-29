import { twindConfig } from '@agile-ui/twind';
import { css } from '@twind/core';

export default twindConfig({
  preflight: css`
    body {
      @apply overflow-y-scroll bg-white text-black text-base antialiased;
    }
  `,
  rules: [
    [
      'bg-gradient-radial-dot',
      { backgroundImage: 'radial-gradient(circle, var(--tw-gradient-from) 1px, var(--tw-gradient-to) 1px)' },
    ],
  ],
  ignorelist: [/^appSplash/, 'stylus'],
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
});
