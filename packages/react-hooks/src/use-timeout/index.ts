import { useIsomorphicLayoutEffect } from '@agile-ui/react-hooks';
import { useEffect, useRef } from 'react';

export const useTimeout = (callback: () => void, delay: number | null) => {
  const callbackRef = useRef(callback);

  useIsomorphicLayoutEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!delay && delay !== 0) {
      return;
    }

    const id = setTimeout(() => callbackRef.current(), delay);

    return () => clearTimeout(id);
  }, [delay]);
};
