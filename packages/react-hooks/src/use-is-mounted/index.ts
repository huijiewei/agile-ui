import { useRef } from 'react';
import { useIsomorphicLayoutEffect } from '../use-isomorphic-layout-effect';

export const useIsMounted = () => {
  const mounted = useRef(false);

  useIsomorphicLayoutEffect(() => {
    mounted.current = true;

    return () => {
      mounted.current = false;
    };
  }, []);

  return mounted;
};
