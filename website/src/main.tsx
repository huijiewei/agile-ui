import './wdyr';

import { ThemeProvider } from '@agile-ui/react';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './App';
import './serviceWorker';

import '@agile-ui/react/styles/agile.css';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);
