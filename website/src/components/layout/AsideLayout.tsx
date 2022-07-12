import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { LazyLoader } from '../shared/LazyLoader';
import { LayoutAside } from './LayoutAside';
import { LayoutFooter } from './LayoutFooter';

export const AsideLayout = () => {
  return (
    <>
      <LayoutAside />
      <div className={'tablet:pl-52'}>
        <main className={'mx-auto h-full p-5'}>
          <Suspense fallback={<LazyLoader className={'h-96'} />}>
            <Outlet />
          </Suspense>
        </main>
        <LayoutFooter />
      </div>
    </>
  );
};
