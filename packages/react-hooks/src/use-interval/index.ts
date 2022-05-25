import { useIsomorphicLayoutEffect } from '@agile-ui/react-hooks';
import { useEffect, useRef } from 'react';

export const useInterval = (callback: () => void, delay: number | null) => {
  const callbackRef = useRef(callback);

  useIsomorphicLayoutEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!delay && delay !== 0) {
      return;
    }

    const id = setInterval(() => callbackRef.current(), delay);

    return () => clearInterval(id);
  }, [delay]);
};
