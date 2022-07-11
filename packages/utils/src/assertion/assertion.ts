export const __DEV__ = process.env.NODE_ENV !== 'production';

export const isBoolean = (value: unknown): value is boolean => {
  return typeof value === 'boolean';
};

export const isNumber = (value: unknown): value is number => {
  return typeof value === 'number';
};

export const isString = (value: unknown): value is string => {
  return typeof value === 'string';
};

export const isUndefined = (value: unknown): value is undefined => {
  return typeof value === 'undefined';
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isObject = (value: unknown): value is Record<any, any> => {
  return value !== null && typeof value === 'object';
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isArray = <T>(value: any): value is Array<T> => {
  return Array.isArray(value);
};

// eslint-disable-next-line @typescript-eslint/ban-types
export const isFunction = (value: unknown): value is Function => {
  return typeof value === 'function';
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isInputEvent = (value: any): value is { target: HTMLInputElement } => {
  return value && isObject(value) && isObject(value.target);
};
