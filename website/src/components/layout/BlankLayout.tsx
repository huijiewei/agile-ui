import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { LazyLoader } from '../shared/LazyLoader';
import { LayoutHeader } from './LayoutHeader';
import { LayoutProvider } from './LayoutProvider';

export const BlankLayout = () => {
  return (
    <LayoutProvider>
      <LayoutHeader />
      <div className={'mx-auto max-w-7xl'}>
        <Suspense fallback={<LazyLoader className={'h-96'} />}>
          <Outlet />
        </Suspense>
      </div>
    </LayoutProvider>
  );
};
