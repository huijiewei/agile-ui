import { MutableRefObject, Ref, RefCallback, useCallback } from 'react';

export const assignRef = <T>(ref: Ref<T>, node: T) => {
  if (typeof ref === 'function') {
    ref(node);
  } else if (ref !== null && ref !== undefined) {
    (ref as MutableRefObject<T>).current = node;
  }
};

export const mergeRefs = <T>(...refs: Ref<T>[]) => {
  return (node: T) => refs.forEach((ref) => assignRef(ref, node));
};

export const useMergedRefs = <T>(...refs: Ref<T>[]): RefCallback<T> => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(mergeRefs(...refs), refs);
};
