import { Layout, LayoutAside, LayoutContent, LayoutHeader } from '@agile-ui/react';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

export const DefaultLayout = () => {
  return (
    <Layout hasAside={true}>
      <LayoutAside className={''}>2</LayoutAside>
      <Layout className={''}>
        <LayoutHeader className={''}>1</LayoutHeader>
        <LayoutContent className={''}>
          <Suspense fallback={null}>
            <Outlet />
          </Suspense>
        </LayoutContent>
      </Layout>
    </Layout>
  );
};
