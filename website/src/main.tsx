import { ThemeProvider } from '@agile-ui/react';
import '@agile-ui/react/styles/reset.css';
import '@agile-ui/react/styles/theme.css';

import { StrictMode } from 'react';
import { render } from 'react-dom';

import { App } from './App';
import './serviceWorker';
import './styles/theme.css';

import './wdyr';

render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
  document.getElementById('root')
);
