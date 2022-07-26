import { isFunction } from '@agile-ui/utils';
import type { MutableRefObject, Ref, RefCallback } from 'react';
import { useCallback } from 'react';

type PossibleRef<T> = Ref<T> | undefined;

export const mergeRefs = <T>(...refs: PossibleRef<T>[]) => {
  return (node: T) =>
    refs.forEach((ref) => {
      if (isFunction(ref)) {
        ref(node);
      } else if (ref != null) {
        (ref as MutableRefObject<T>).current = node;
      }
    });
};

export const useMergedRefs = <T>(...refs: PossibleRef<T>[]): RefCallback<T> => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(mergeRefs(...refs), refs);
};
