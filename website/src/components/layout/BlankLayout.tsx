import { createContext } from '@agile-ui/react';
import { Dispatch, ReactNode, SetStateAction, Suspense, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { LazyLoader } from '../shared/LazyLoader';
import { LayoutHeader } from './LayoutHeader';

const [LayoutStateProvider, useLayoutState] = createContext<boolean>({
  name: 'LayoutStateContext',
  strict: true,
});
const [LayoutDispatchProvider, useLayoutDispatch] = createContext<Dispatch<SetStateAction<boolean>>>({
  name: 'LayoutDispatchContext',
  strict: true,
});

export { useLayoutState, useLayoutDispatch };

export const LayoutProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState(false);

  return (
    <LayoutStateProvider value={state}>
      <LayoutDispatchProvider value={setState}>{children}</LayoutDispatchProvider>
    </LayoutStateProvider>
  );
};

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
