import type { Dict } from '../types/types';

// 从对象中排除属性后返回新对象
export const omit = <T extends Dict, K extends keyof T>(object: T, keys: K[]) => {
  return keys.reduce(
    (acc, key) => {
      delete acc[key];
      return acc;
    },
    { ...object }
  ) as Omit<T, K>;
};

// 从对象中拾取属性后返回新对象
export const pick = <T extends Dict, K extends keyof T>(object: T, keys: K[]) => {
  const result = {} as { [P in K]: T[P] };

  keys.forEach((key) => {
    if (key in object) {
      result[key] = object[key];
    }
  });

  return result;
};

// 将对象中的属性分割成两个对象
export const split = <T extends Dict, K extends keyof T>(object: T, keys: K[]) => {
  const picked: Dict = {};
  const omitted: Dict = {};

  Object.keys(object).forEach((key) => {
    if (keys.includes(key as T[K])) {
      picked[key] = object[key];
    } else {
      omitted[key] = object[key];
    }
  });

  return [picked, omitted] as [{ [P in K]: T[P] }, Omit<T, K>];
};
