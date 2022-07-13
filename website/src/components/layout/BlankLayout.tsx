import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { LazyLoader } from '../shared/LazyLoader';
import { LayoutHeader } from './LayoutHeader';

export const BlankLayout = () => {
  return (
    <>
      <LayoutHeader />
      <div className={'mx-auto max-w-7xl'}>
        <Suspense fallback={<LazyLoader className={'h-96'} />}>
          <Outlet />
        </Suspense>
      </div>
    </>
  );
};
