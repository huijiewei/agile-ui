import { DependencyList, useEffect, useMemo, useRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useCallbackRef = <T extends (...args: any[]) => any>(
  callback: T | undefined,
  deps: DependencyList = []
): T => {
  const ref = useRef(callback);

  useEffect(() => {
    ref.current = callback;
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => ((...args) => ref.current?.(...args)) as T, deps);
};
