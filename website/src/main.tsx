import './wdyr';
import { __DEV__ } from '@agile-ui/utils';

import { HelmetProvider } from 'react-helmet-async';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './App';
import './serviceWorker';
import { disableReactDevTools } from './utils/misc';

if (!__DEV__) {
  disableReactDevTools();
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>
);
