import { matchRoutes, Navigate, RouteObject, To, useRoutes, Location } from 'react-router-dom';
import { DefaultLayout } from '../layouts/DefaultLayout';

import Home from '../views/site/Home';
import NotFound from '../views/site/NotFound';
import View from '../views/components/View';

export const routes = [
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
        title: '',
        element: <Home />,
      },
      {
        path: 'components/:component',
        title: '组件',
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

export type RouteMatch = {
  to: To;
  title?: string;
};

type RouteMatchObject = RouteObject & {
  title?: string;
};

export const getMatchRoutes = (location: Location): RouteMatch[] => {
  return (
    matchRoutes(routes, location)
      ?.filter((match) => match.route.path != '/')
      .map((match) => {
        const route = match.route as RouteMatchObject;

        return {
          to: match.pathname,
          title: route.title,
        };
      }) ?? []
  );
};
