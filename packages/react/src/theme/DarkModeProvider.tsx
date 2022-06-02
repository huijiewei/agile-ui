import { useLocalStorage, useMediaQuery, useUpdateEffect } from '@agile-ui/react-hooks';
import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { createContext } from '../utils/context';

const [DarkModeStateProvider, useDarkModeState] = createContext<boolean>({
  name: 'DarkModeStateContext',
  strict: true,
});
const [DarkModeDispatchProvider, useDarkModeDispatch] = createContext<Dispatch<SetStateAction<boolean>>>({
  name: 'DarkModeDispatchContext',
  strict: true,
});

export { useDarkModeState, useDarkModeDispatch };

export const DarkModeProvider = ({ children }: { children: ReactNode }) => {
  const darkOS = useMediaQuery('(prefers-color-scheme: dark)');

  const [state, setState] = useLocalStorage('ag:dark-mode', darkOS);

  useUpdateEffect(() => {
    setState(darkOS);
  }, [darkOS]);

  return (
    <DarkModeStateProvider value={state}>
      <DarkModeDispatchProvider value={setState}>{children}</DarkModeDispatchProvider>
    </DarkModeStateProvider>
  );
};
