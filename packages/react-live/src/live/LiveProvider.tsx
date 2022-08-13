import type { ReactNode } from 'react';

import { LiveContext } from './LiveContext';
import type { Language, PrismTheme } from 'prism-react-renderer';
import { useEffect, useState } from 'react';
import { useRunner, UseRunnerProps } from '../runner/useRunner';

export type LiveProviderProps = Omit<UseRunnerProps, 'code'> & {
  code?: string;
  theme: PrismTheme;
  language?: Language;
  children?: ReactNode;
  transformCode?: (code: string) => string;
};

export const LiveProvider = ({
  children,
  code: initialCode = '',
  transformCode,
  language = 'jsx',
  theme,
  ...rest
}: LiveProviderProps) => {
  const [code, onChange] = useState(initialCode);

  const { element, error } = useRunner({
    code: transformCode ? transformCode(code) : code,
    ...rest,
  });

  useEffect(() => {
    onChange(initialCode);
  }, [initialCode]);

  return (
    <LiveContext.Provider value={{ element, error, code, onChange, language, theme }}>{children}</LiveContext.Provider>
  );
};
