import './wdyr';

import { StrictMode } from 'react';
import { render } from 'react-dom';

import { ThemeProvider } from '@agile-ui/react';
import { BrowserRouter } from 'react-router-dom';
import './styles/theme.css';

import { App } from './App';

render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider resetCSS={true}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root')
);
