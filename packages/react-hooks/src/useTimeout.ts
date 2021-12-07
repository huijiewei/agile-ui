import { useEffect, useLayoutEffect, useRef } from 'react';

export const useTimeout = (callback: () => void, delay: number | null) => {
  const callbackRef = useRef(callback);

  useLayoutEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!delay && delay !== 0) {
      return;
    }

    const timeout = setTimeout(() => callbackRef.current(), delay);

    return () => clearTimeout(timeout);
  }, [delay]);
};
