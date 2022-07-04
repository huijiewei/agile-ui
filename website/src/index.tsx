import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { setup } from 'twind';

import { App } from './App';
import twindConfig from './twind.config';

setup(twindConfig);

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('app')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
