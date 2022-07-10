import { AgileProvider } from '@agile-ui/react';
import { useEventListener } from '@agile-ui/react-hooks';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { ReloadPrompt } from './components/shared/ReloadPrompt';
import { AppRoutes } from './data/routes';

export const App = () => {
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
        <Helmet defaultTitle={'Agile UI'} titleTemplate={'%s - Agile UI'} />
        <AgileProvider>
          <AppRoutes />
          <ReloadPrompt />
        </AgileProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
};
