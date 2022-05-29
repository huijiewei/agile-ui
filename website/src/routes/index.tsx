import { Location, matchRoutes, Navigate, RouteObject, To, useLocation, useRoutes } from 'react-router-dom';
import { DefaultLayout } from '../layouts/DefaultLayout';
import ComponentView from '../views/components/View';

import Home from '../views/site/Home';
import NotFound from '../views/site/NotFound';

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
        element: <ComponentView />,
      },
      {
        path: '*',
        title: '页面不存在',
        element: <NotFound />,
      },
    ],
  },
];

export const Routes = ({
  location,
}: {
  location: string | Partial<Location> | undefined;
}): ReturnType<typeof useRoutes> => {
  return useRoutes(routes, location);
};

export const AppRoutes = () => {
  const location = useLocation();

  return <Routes key={location.pathname} location={location} />;
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
