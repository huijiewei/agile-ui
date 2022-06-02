import { DarkModeProvider } from '@agile-ui/react';
import { useEventListener } from '@agile-ui/react-hooks';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { AppHelmet } from './AppHelmet';
import { AppRoutes } from './routes';

export const App = () => {
  const splash = document.getElementById('index-splash');

  useEventListener(
    'animationend',
    () => {
      splash?.remove();
    },
    { target: splash }
  );

  return (
    <HelmetProvider>
      <BrowserRouter>
        <AppHelmet />
        <DarkModeProvider>
          <AppRoutes />
        </DarkModeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
};
