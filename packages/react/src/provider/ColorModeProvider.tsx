import { useLocalStorage, useMediaQuery, useUpdateEffect } from '@agile-ui/react-hooks';
import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { createContext } from '../utils/context';

export type ColorMode = 'system' | 'light' | 'dark';

const [ColorModeStateProvider, useColorModeState] = createContext<{ darkMode: boolean; colorMode: ColorMode }>({
  name: 'ColorModeStateContext',
  strict: true,
});

const [ColorModeDispatchProvider, useColorModeDispatch] = createContext<() => void>({
  name: 'ColorModeDispatchContext',
  strict: true,
});

const COLOR_SCHEME_QUERY = '(prefers-color-scheme: dark)';

export { useColorModeState, useColorModeDispatch };

export const ColorModeProvider = ({ children }: { children: ReactNode }) => {
  const darkOS = useMediaQuery(COLOR_SCHEME_QUERY);

  const [colorMode, setColorMode] = useLocalStorage<ColorMode>('ag:color-mode', 'system');
  const [darkMode, setDarkMode] = useState<boolean>(darkOS);

  useUpdateEffect(() => {
    if (colorMode == 'system') {
      setDarkMode(darkOS);
    }
  }, [darkOS]);

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
    <ColorModeDispatchProvider value={toggleColorMode}>
      <ColorModeStateProvider value={{ darkMode, colorMode }}>{children}</ColorModeStateProvider>
    </ColorModeDispatchProvider>
  );
};
