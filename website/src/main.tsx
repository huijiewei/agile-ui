import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { setup } from 'twind';

import { App } from './App';
import twindConfig from './twind.config';

setup(twindConfig);

import reportWebVitals from './reportWebVitals';
import { sendToVercelAnalytics } from './vitals';

createRoot(document.getElementById('app') as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);

reportWebVitals(sendToVercelAnalytics);
