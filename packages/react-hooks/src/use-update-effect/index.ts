import { DependencyList, EffectCallback, useEffect, useRef } from 'react';

export const useUpdateEffect = (effect: EffectCallback, dependencies?: DependencyList) => {
  const mounted = useRef(false);

  useEffect(() => {
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (mounted.current) {
      return effect();
    } else {
      mounted.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
};
