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

    const id = setTimeout(() => callbackRef.current(), delay);

    return () => clearTimeout(id);
  }, [delay]);
};
