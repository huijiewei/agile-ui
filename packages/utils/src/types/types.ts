export type Merge<T, P> = P & Omit<T, keyof P>;

export type Booleanish = boolean | 'true' | 'false';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Dict<T = any> = Record<string, T>;
