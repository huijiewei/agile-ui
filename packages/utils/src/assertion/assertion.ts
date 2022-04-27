export const __DEV__ = process.env.NODE_ENV !== 'production';

export const isNumber = (value: unknown): value is number => {
  return typeof value === 'number';
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isArray = <T>(value: any): value is Array<T> => {
  return Array.isArray(value);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isObject = (value: any): boolean => {
  const type = typeof value;
  return !!value && (type == 'object' || type == 'function') && !isArray(value);
};