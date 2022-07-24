import { useContext, useEffect, useId } from 'react';
import { PresenceContext } from './PresenceContext';

export type SafeToRemove = () => void;

export const usePresence = (): [true, null] | [true] | [false, SafeToRemove] => {
  const id = useId();
  const context = useContext(PresenceContext);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => context?.register(id), []);

  if (context == null) {
    return [true, null];
  }

  const { isPresent, onExitComplete } = context;

  const safeToRemove = () => onExitComplete?.(id);

  return !isPresent && onExitComplete ? [false, safeToRemove] : [true];
};
