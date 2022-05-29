import { useTimeout } from '@agile-ui/react-hooks';
import { AnimatePresence } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { AppHelmet } from './AppHelmet';
import { AppRoutes } from './routes';

export const App = () => {
  useTimeout(() => {
    document.getElementById('splash')?.remove();
  }, 500);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <AppHelmet />
        <AnimatePresence exitBeforeEnter>
          <AppRoutes />
        </AnimatePresence>
      </BrowserRouter>
    </HelmetProvider>
  );
};
