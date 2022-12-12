import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { setup } from '@twind/core';

import { App } from './App';
import twindConfig from './twind.config';

setup(twindConfig);

import { webVitals } from './webVitals';

createRoot(document.getElementById('app') as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);

webVitals();
