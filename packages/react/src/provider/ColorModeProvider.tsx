import { useLocalStorage, useMediaQuery } from '@agile-ui/react-hooks';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { createContext } from '../utils/context';

export type ColorMode = 'system' | 'light' | 'dark';

type ColorModeStateValue = { darkMode: boolean; colorMode: ColorMode };

const [ColorModeStateProvider, useColorModeState] = createContext<ColorModeStateValue>({
  name: 'ColorModeStateContext',
  strict: true,
});

type ColorModeDispatch = {
  setColorMode: Dispatch<SetStateAction<ColorMode>>;
  toggleColorMode: () => void;
};

const [ColorModeDispatchProvider, useColorModeDispatch] = createContext<ColorModeDispatch>({
  name: 'ColorModeDispatchContext',
  strict: true,
});

const COLOR_SCHEME_QUERY = '(prefers-color-scheme: dark)';

export { useColorModeState, useColorModeDispatch };

export const ColorModeProvider = ({ children }: { children: ReactNode }) => {
  const darkOS = useMediaQuery(COLOR_SCHEME_QUERY);

  const [colorMode, setColorMode] = useLocalStorage<ColorMode>('ag:color-mode', 'system');
  const [darkMode, setDarkMode] = useState<boolean>(darkOS);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    switch (colorMode) {
      case 'light':
        setDarkMode(false);
        break;
      case 'system':
        setDarkMode(darkOS);
        break;
      case 'dark':
        setDarkMode(true);
        break;
    }
  }, [colorMode, darkOS]);

  const toggleColorMode = () => {
    const toggleDict: Record<ColorMode, ColorMode> = {
      light: 'system',
      system: 'dark',
      dark: 'light',
    };

    setColorMode((prev) => toggleDict[prev]);
  };

  return (
    <ColorModeDispatchProvider value={{ setColorMode, toggleColorMode }}>
      <ColorModeStateProvider value={{ darkMode, colorMode }}>{children}</ColorModeStateProvider>
    </ColorModeDispatchProvider>
  );
};
