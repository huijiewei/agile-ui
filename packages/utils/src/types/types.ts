export type Merge<T, P> = P & Omit<T, keyof P>;

export type Booleanish = boolean | 'true' | 'false';

export type StringOrNumber = string | number;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Dict<T = any> = Record<string, T>;
