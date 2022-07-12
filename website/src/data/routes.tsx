import { useRoutes } from 'react-router-dom';
import { AsideLayout } from '../components/layout/AsideLayout';
import { BlankLayout } from '../components/layout/BlankLayout';
import ComponentView from '../views/components/View';
import DocumentView from '../views/documents/View';

import Home from '../views/site/Home';

export const routes = [
  {
    path: '/',
    element: <BlankLayout />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: '/',
        element: <AsideLayout />,
        children: [
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
    ],
  },
];

export const AppRoutes = () => {
  return useRoutes(routes);
};
