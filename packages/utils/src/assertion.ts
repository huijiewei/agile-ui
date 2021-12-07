import { Dict } from './types';

export const __DEV__ = process.env.NODE_ENV !== 'production';

export const isBrowser = (): boolean => {
  return Boolean(globalThis?.document);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isArray = <T>(value: any): value is Array<T> => {
  return Array.isArray(value);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isObject = (value: any): value is Dict => {
  const type = typeof value;
  return value != null && (type === 'object' || type === 'function') && !isArray(value);
};
