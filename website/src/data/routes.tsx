import { useRoutes } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import ComponentView from '../views/components/View';

import Home from '../views/site/Home';
import NotFound from '../views/site/NotFound';

export const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'components/:component',
        element: <ComponentView />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
];

export const AppRoutes = () => {
  return useRoutes(routes);
};
