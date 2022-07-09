import { useLocalStorage, useMediaQuery, useUpdateEffect } from '@agile-ui/react-hooks';
import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { createContext } from '../utils/context';

const [ColorModeStateProvider, useColorModeState] = createContext<boolean>({
  name: 'DarkModeStateContext',
  strict: true,
});
const [ColorModeDispatchProvider, useColorModeDispatch] = createContext<Dispatch<SetStateAction<boolean>>>({
  name: 'DarkModeDispatchContext',
  strict: true,
});

export { useColorModeState, useColorModeDispatch };

export const ColorModeProvider = ({ children }: { children: ReactNode }) => {
  const darkOS = useMediaQuery('(prefers-color-scheme: dark)');

  const [state, setState] = useLocalStorage('ag:color-mode', darkOS);

  useUpdateEffect(() => {
    setState(darkOS);
  }, [darkOS]);

  return (
    <ColorModeDispatchProvider value={setState}>
      <ColorModeStateProvider value={state}>{children}</ColorModeStateProvider>
    </ColorModeDispatchProvider>
  );
};
