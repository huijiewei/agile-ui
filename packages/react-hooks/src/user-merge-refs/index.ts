import { MutableRefObject, Ref, RefCallback, useCallback } from 'react';

export const assignRef = <T>(ref: Ref<T>, node: T) => {
  if (ref) {
    if (typeof ref === 'function') {
      ref(node);
    } else {
      (ref as MutableRefObject<T>).current = node;
    }
  }
};

export const mergeRefs = <T>(...refs: Ref<T>[]) => {
  return (node: T) => refs.forEach((ref) => assignRef(ref, node));
};

export const useMergedRef = <T>(...refs: Ref<T>[]): RefCallback<T> => {
  return useCallback(
    (node: T) => {
      refs.forEach((ref) => assignRef(ref, node));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    refs
  );
};
