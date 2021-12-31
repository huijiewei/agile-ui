import { Layout, LayoutAside, LayoutContent, LayoutHeader } from '@agile-ui/react';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { appAsideClass, appContentClass, appHeaderClass, appMainClass } from './DefaultLayout.css';

export const DefaultLayout = () => {
  return (
    <Layout hasAside={true}>
      <LayoutAside className={appAsideClass}>2</LayoutAside>
      <Layout className={appMainClass}>
        <LayoutHeader className={appHeaderClass}>1</LayoutHeader>
        <LayoutContent className={appContentClass}>
          <Suspense fallback={null}>
            <Outlet />
          </Suspense>
        </LayoutContent>
      </Layout>
    </Layout>
  );
};
