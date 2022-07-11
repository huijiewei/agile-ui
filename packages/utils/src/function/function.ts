import { isFunction } from '../assertion/assertion';

export type MaybeFunction<T, Args extends unknown[] = []> = T | ((...args: Args) => T);

export const runIfFn = <T, U>(valueOrFn: T | ((...fnArgs: U[]) => T), ...args: U[]): T => {
  return isFunction(valueOrFn) ? valueOrFn(...args) : valueOrFn;
};
