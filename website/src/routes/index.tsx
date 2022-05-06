import { Navigate, useRoutes } from 'react-router-dom';
import { DefaultLayout } from '../layouts/DefaultLayout';
import { View } from '../views/components/View';

import Home from '../views/site/Home';
import NotFound from '../views/site/NotFound';

const routes = [
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="home" replace={true} />,
      },
      {
        path: 'home',
        title: '首页',
        element: <Home />,
      },
      {
        path: 'components/:component',
        title: '首页',
        element: <View />,
      },
      {
        path: '*',
        title: '页面不存在',
        element: <NotFound />,
      },
    ],
  },
];

export const AppRoutes = (): ReturnType<typeof useRoutes> => {
  return useRoutes(routes);
};
