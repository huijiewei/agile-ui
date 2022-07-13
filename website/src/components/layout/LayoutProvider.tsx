import { createContext } from '@agile-ui/react';
import { Dispatch, ReactNode, SetStateAction, useState } from 'react';

const [LayoutAsideExistedStateProvider, useLayoutAsideExisted] = createContext<boolean>({
  name: 'LayoutAsideExistedContext',
  strict: true,
});

const [LayoutAsideExistedDispatchProvider, useLayoutAsideExistedDispatch] = createContext<
  Dispatch<SetStateAction<boolean>>
>({
  name: 'LayoutAsideExistedDispatchContext',
  strict: true,
});

export { useLayoutAsideExisted, useLayoutAsideExistedDispatch };

const LayoutAsideExistedProvider = ({ children }: { children: ReactNode }) => {
  const [existed, setExisted] = useState(false);

  return (
    <LayoutAsideExistedDispatchProvider value={setExisted}>
      <LayoutAsideExistedStateProvider value={existed}>{children}</LayoutAsideExistedStateProvider>
    </LayoutAsideExistedDispatchProvider>
  );
};

const [LayoutAsideCollapsedStateProvider, useLayoutAsideCollapsed] = createContext<boolean>({
  name: 'LayoutAsideCollapsedContext',
  strict: true,
});

const [LayoutAsideCollapsedDispatchProvider, useLayoutAsideCollapsedDispatch] = createContext<
  Dispatch<SetStateAction<boolean>>
>({
  name: 'LayoutAsideCollapsedDispatchContext',
  strict: true,
});

const LayoutAsideCollapsedProvider = ({ children }: { children: ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <LayoutAsideCollapsedDispatchProvider value={setCollapsed}>
      <LayoutAsideCollapsedStateProvider value={collapsed}>{children}</LayoutAsideCollapsedStateProvider>
    </LayoutAsideCollapsedDispatchProvider>
  );
};

export { useLayoutAsideCollapsed, useLayoutAsideCollapsedDispatch };

export const LayoutProvider = ({ children }: { children: ReactNode }) => {
  return (
    <LayoutAsideExistedProvider>
      <LayoutAsideCollapsedProvider>{children}</LayoutAsideCollapsedProvider>
    </LayoutAsideExistedProvider>
  );
};
