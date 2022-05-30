import { useEventListener } from '@agile-ui/react-hooks/src/use-event-listener';
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
    splash
  );

  return (
    <HelmetProvider>
      <BrowserRouter>
        <AppHelmet />
        <AppRoutes />
      </BrowserRouter>
    </HelmetProvider>
  );
};
