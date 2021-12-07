import { MutableRefObject, Ref, useCallback } from 'react';

type PossibleRef<T> = Ref<T> | undefined;

export const composeRefs = <T>(...refs: PossibleRef<T>[]) => {
  return (node: T) =>
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref !== null && ref !== undefined) {
        (ref as MutableRefObject<T>).current = node;
      }
    });
};

export const useComposedRefs = <T>(...refs: PossibleRef<T>[]) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(composeRefs(...refs), refs);
};
