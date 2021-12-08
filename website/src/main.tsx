import './wdyr';

import { StrictMode } from 'react';
import { render } from 'react-dom';

import { App } from './App';
import { ThemeProvider } from '@agile-ui/react';
import './styles/theme.css';

render(
  <StrictMode>
    <ThemeProvider resetCSS={true}>
      <App />
    </ThemeProvider>
  </StrictMode>,
  document.getElementById('root')
);
