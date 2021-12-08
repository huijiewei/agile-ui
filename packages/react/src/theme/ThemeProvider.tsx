import { Mode } from './tokens/colors';
import { createContext, PropsWithChildren, useEffect } from 'react';
import './styles/global.css';

type ThemeContextValue = {
  mode: Mode;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

type ThemeProviderProps = {
  defaultMode?: Mode;
  resetCSS?: boolean;
  cssVarsRoot?: string;
  theme?: string;
};

export const ThemeProvider = ({
  defaultMode = 'light',
  resetCSS = true,
  children,
}: PropsWithChildren<ThemeProviderProps>) => {
  useEffect(() => {
    if (resetCSS) {
      import('./styles/reset.css');
    }
  }, [resetCSS]);

  return <ThemeContext.Provider value={{ mode: defaultMode }}>{children}</ThemeContext.Provider>;
};
