import { MutableRefObject, Ref, RefCallback, useCallback } from 'react';

type PossibleRef<T> = Ref<T> | undefined;

export const mergeRefs = <T>(...refs: PossibleRef<T>[]) => {
  return (node: T) =>
    refs.forEach((ref) => {
      if (typeof ref == 'function') {
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
