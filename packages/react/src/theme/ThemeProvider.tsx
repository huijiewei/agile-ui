import { Mode } from '@agile-ui/tokens';
import { createContext, PropsWithChildren } from 'react';

type ThemeContextValue = {
  mode: Mode;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

type ThemeProviderProps = {
  defaultMode?: Mode;
};

export const ThemeProvider = ({ defaultMode = 'light', children }: PropsWithChildren<ThemeProviderProps>) => {
  return <ThemeContext.Provider value={{ mode: defaultMode }}>{children}</ThemeContext.Provider>;
};
