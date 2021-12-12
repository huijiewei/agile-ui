import './wdyr';

import './styles/theme.css';

import { StrictMode } from 'react';
import { render } from 'react-dom';

import { ThemeProvider } from '@agile-ui/react';
import { BrowserRouter } from 'react-router-dom';

import { App } from './App';

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
