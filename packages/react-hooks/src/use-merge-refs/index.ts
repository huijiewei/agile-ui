import { MutableRefObject, Ref, RefCallback, useCallback } from 'react';

type PossibleRef<T> = Ref<T> | undefined;

export const assignRef = <T>(ref: PossibleRef<T> | undefined, node: T) => {
  if (typeof ref === 'function') {
    ref(node);
  } else if (ref !== null && ref !== undefined) {
    (ref as MutableRefObject<T>).current = node;
  }
};

export const mergeRefs = <T>(...refs: PossibleRef<T>[]) => {
  return (node: T) => refs.forEach((ref) => assignRef(ref, node));
};

export const useMergedRefs = <T>(...refs: PossibleRef<T>[]): RefCallback<T> => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(mergeRefs(...refs), refs);
};
