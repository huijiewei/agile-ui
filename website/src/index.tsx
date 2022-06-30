import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { __DEV__ } from '@agile-ui/utils';
import { setup } from 'twind';

import { App } from './App';
import twindConfig from './twind.config';
import { disableReactDevTools } from './utils/misc';

if (!__DEV__) {
  disableReactDevTools();
}

setup(twindConfig);

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('app')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
