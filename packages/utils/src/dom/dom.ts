import type { Booleanish } from '../types/types';

export const isBrowser = (): boolean => {
  return typeof window !== 'undefined';
};

export const dataAttr = (condition: boolean | undefined) => (condition ? '' : undefined) as Booleanish;

export const ariaAttr = (condition: boolean | undefined) => (condition ? true : undefined);
