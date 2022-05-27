import type { Booleanish } from '../types/types';

export const isBrowser = (): boolean => {
  return Boolean(globalThis?.document);
};

export const dataAttr = (condition: boolean | undefined) => (condition ? '' : undefined) as Booleanish;

export const ariaAttr = (condition: boolean | undefined) => (condition ? true : undefined);
