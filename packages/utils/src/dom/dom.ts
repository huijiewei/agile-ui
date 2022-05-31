import type { MutableRefObject } from 'react';
import type { Booleanish } from '../types/types';

export const isBrowser = (): boolean => {
  return typeof window !== 'undefined';
};

export const dataAttr = (condition: boolean | undefined) => (condition ? '' : undefined) as Booleanish;

export const ariaAttr = (condition: boolean | undefined) => (condition ? true : undefined);

type TargetValue<T> = T | undefined | null;
type TargetType = HTMLElement | Element | Window | Document;

export type BasicTarget<T extends TargetType = Element> = TargetValue<T> | MutableRefObject<TargetValue<T>>;

export const getTargetElement = <T extends TargetType>(target: BasicTarget<T>, defaultElement?: T) => {
  if (!isBrowser) {
    return undefined;
  }

  if (!target) {
    return defaultElement;
  }

  if ('current' in target) {
    return target.current;
  }

  return target;
};
