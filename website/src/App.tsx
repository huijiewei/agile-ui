import { AgileProvider } from '@agile-ui/react';
import { useEventListener, useTimeout } from '@agile-ui/react-hooks';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { ReloadPrompt } from './components/shared/ReloadPrompt';
import { AppRoutes } from './data/routes';
import { domMax, LazyMotion } from 'framer-motion';

export const App = () => {
  const splash = document.getElementById('appSplash');

  useEventListener(
    'animationend',
    () => {
      splash?.remove();
    },
    { target: splash }
  );

  useTimeout(() => {
    splash?.remove();
  }, 2000);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Helmet defaultTitle={'Agile UI'} titleTemplate={'%s - Agile UI'} />
        <LazyMotion strict features={domMax}>
          <AgileProvider>
            <AppRoutes />
            <ReloadPrompt />
          </AgileProvider>
        </LazyMotion>
      </BrowserRouter>
    </HelmetProvider>
  );
};
