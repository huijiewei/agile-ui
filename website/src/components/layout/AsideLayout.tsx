import { Suspense, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { LazyLoader } from '../shared/LazyLoader';
import { useLayoutAsideExistedDispatch } from './LayoutProvider';
import { LayoutAside } from './LayoutAside';
import { LayoutFooter } from './LayoutFooter';

export const AsideLayout = () => {
  const dispatch = useLayoutAsideExistedDispatch();

  useEffect(() => {
    dispatch && dispatch(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <LayoutAside />
      <div className={'tablet:pl-64'}>
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
