import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { LayoutAside } from './LayoutAside';
import { LayoutFooter } from './LayoutFooter';
import { LayoutHeader } from './LayoutHeader';

export const DefaultLayout = () => {
  return (
    <>
      <LayoutHeader />
      <div className={'mx-auto max-w-7xl '}>
        <LayoutAside />
        <div className={'laptop:pl-52'}>
          <main className={'mx-auto h-full p-5'}>
            <Suspense fallback={null}>
              <Outlet />
            </Suspense>
          </main>
          <LayoutFooter />
        </div>
      </div>
    </>
  );
};
