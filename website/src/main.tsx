import './wdyr';

import { HelmetProvider } from 'react-helmet-async';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './App';
import './serviceWorker';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>
);
