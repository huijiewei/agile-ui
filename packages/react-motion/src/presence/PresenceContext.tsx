import { createContext } from 'react';

export type PresenceContextProps = {
  id: string;
  isPresent: boolean;
  register: (id: string) => () => void;
  onExitComplete?: (id: string) => void;
  initial?: false | string | string[];
};

export const PresenceContext = createContext<PresenceContextProps | null>(null);
