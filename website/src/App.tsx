import { DarkModeProvider } from '@agile-ui/react';
import { useEventListener } from '@agile-ui/react-hooks';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { AppHelmet } from './AppHelmet';
import { AppRoutes } from './data/routes';

export const App = () => {
  useRegisterSW();

  const splash = document.getElementById('appSplash');

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
