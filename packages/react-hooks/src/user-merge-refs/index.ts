import { MutableRefObject, Ref, useCallback } from 'react';

type PossibleRef<T> = Ref<T> | MutableRefObject<T> | undefined;

export const mergeRefs = <T>(...refs: PossibleRef<T>[]) => {
  return (node: T) =>
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        (ref as MutableRefObject<T>).current = node;
      }
    });
};

export const useMergeRefs = <T>(...refs: PossibleRef<T>[]) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(mergeRefs(...refs), refs);
};
