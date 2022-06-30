import { createContext } from '@agile-ui/react';
import { Dispatch, ReactNode, SetStateAction, Suspense, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Loader } from '../components/loader/Loader';
import { LayoutAside } from './LayoutAside';
import { LayoutFooter } from './LayoutFooter';
import { LayoutHeader } from './LayoutHeader';

const [LayerStateProvider, useLayerState] = createContext<boolean>({
  name: 'LayerStateContext',
  strict: true,
});
const [LayerDispatchProvider, useLayerDispatch] = createContext<Dispatch<SetStateAction<boolean>>>({
  name: 'LayerDispatchContext',
  strict: true,
});

export { useLayerState, useLayerDispatch };

export const LayerProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState(false);

  return (
    <LayerStateProvider value={state}>
      <LayerDispatchProvider value={setState}>{children}</LayerDispatchProvider>
    </LayerStateProvider>
  );
};

export const DefaultLayout = () => {
  return (
    <LayerProvider>
      <LayoutHeader />
      <div className={'mx-auto max-w-7xl'}>
        <LayoutAside />
        <div className={'tablet:pl-52'}>
          <main className={'mx-auto h-full p-5'}>
            <Suspense fallback={<Loader className={'h-96'} />}>
              <Outlet />
            </Suspense>
          </main>
          <LayoutFooter />
        </div>
      </div>
    </LayerProvider>
  );
};
