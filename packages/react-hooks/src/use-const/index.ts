import { runIfFn } from '@agile-ui/utils';
import type { MaybeFunction } from '@agile-ui/utils';
import { useRef } from 'react';

export const useConst = <T = unknown>(init: MaybeFunction<T>): T => {
  const ref = useRef<T | null>(null);

  if (ref.current === null) {
    ref.current = runIfFn(init);
  }

  return ref.current;
};
