import './wdyr';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { __DEV__ } from '@agile-ui/utils';
import presetAutoprefix from '@twind/preset-autoprefix';
import presetExt from '@twind/preset-ext';
import presetTailwind from '@twind/preset-tailwind';

import { presetAgile } from '@agile-ui/twind';
import { injectGlobal, setup } from 'twind';

import { App } from './App';
import reportWebVitals from './reportWebVitals';
import { disableReactDevTools } from './utils/misc';

import './serviceWorker';

if (!__DEV__) {
  disableReactDevTools();
}

setup({
  presets: [presetAutoprefix(), presetExt(), presetTailwind(), presetAgile()],
  rules: [
    [
      'bg-gradient-radial-dot',
      { backgroundImage: 'radial-gradient(circle, var(--tw-gradient-from) 1px, var(--tw-gradient-to) 1px)' },
    ],
  ],
  ignorelist: [/^index-splash-/],
});

injectGlobal`
body {
    @apply text-black bg-white dark:text-white dark:bg-slate-900 antialiased overflow-y-scroll &::-webkit-scrollbar:(w-[12px] h-[12px]) &::-webkit-scrollbar-thumb:(border-([3px] solid transparent) bg-clip-padding bg-gray-300 rounded-[5px]);
}
`;

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

reportWebVitals();
