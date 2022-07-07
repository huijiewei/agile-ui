import { isFunction } from '../assertion/assertion';

export const runIfFn = <T, U>(valueOrFn: T | ((...fnArgs: U[]) => T), ...args: U[]): T => {
  return isFunction(valueOrFn) ? valueOrFn(...args) : valueOrFn;
};

export type MaybeFunction<T, Args extends unknown[] = []> = T | ((...args: Args) => T);
