import { useRoutes } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import ComponentView from '../views/components/View';
import DocumentView from '../views/documents/View';

import Home from '../views/site/Home';

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
        path: ':document',
        element: <DocumentView />,
      },
    ],
  },
];

export const AppRoutes = () => {
  return useRoutes(routes);
};
