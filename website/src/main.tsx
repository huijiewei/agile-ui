import { ThemeProvider } from '@agile-ui/react';
import '@agile-ui/react/styles/reset.css';
import '@agile-ui/react/styles/theme.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './App';
import './serviceWorker';
import './styles/theme.css';

import './wdyr';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);
