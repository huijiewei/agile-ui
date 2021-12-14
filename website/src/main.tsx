import { ThemeProvider } from '@agile-ui/react';
import '@agile-ui/react/styles/reset.css';
import '@agile-ui/react/styles/theme.css';

import { StrictMode } from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { App } from './App';
import './styles/theme.css';
import './wdyr';

render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root')
);
