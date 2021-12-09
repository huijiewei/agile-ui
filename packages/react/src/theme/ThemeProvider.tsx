import { Mode } from './tokens/colors';
import { createContext, PropsWithChildren } from 'react';

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
  if (resetCSS) {
    import('./styles/reset.css');
  }

  import('./styles/global.css');

  return <ThemeContext.Provider value={{ mode: defaultMode }}>{children}</ThemeContext.Provider>;
};
