import { useTimeout } from '@agile-ui/react-hooks';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';

export const App = () => {
  useTimeout(() => {
    document.getElementById('splash')?.remove();
  }, 500);

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};
