import { createContext, useContext } from 'react';
import type { Language, PrismTheme } from 'prism-react-renderer';
import type { UseRunnerReturn } from '../runner/useRunner';

export type LiveContextProps = UseRunnerReturn & {
  language?: Language;
  theme: PrismTheme;
  code: string;
  onChange: (value: string) => void;
};

export const LiveContext = createContext<LiveContextProps>({} as LiveContextProps);

export const useLiveContext = () => useContext(LiveContext);
