import { createContext, PropsWithChildren } from 'react';

type ThemeContextValue = {
  mode: 'dark' | 'light';
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

type ThemeProviderProps = {
  defaultMode?: 'dark' | 'light';
};

export const ThemeProvider = ({ defaultMode = 'light', children }: PropsWithChildren<ThemeProviderProps>) => {
  return <ThemeContext.Provider value={{ mode: defaultMode }}>{children}</ThemeContext.Provider>;
};
