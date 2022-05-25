import { useFirstRender } from '@agile-ui/react-hooks';
import { DependencyList, EffectCallback, useEffect } from 'react';

export const useUpdateEffect = (effect: EffectCallback, deps?: DependencyList) => {
  const first = useFirstRender();

  useEffect(() => {
    if (!first) {
      return effect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
