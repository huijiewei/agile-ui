export const sleep = (delay: number): Promise<null> => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

export const to = <T, E = Error>(promise: Promise<T>): Promise<[E, undefined] | [null, T]> => {
  return promise.then<[null, T]>((data) => [null, data]).catch<[E, undefined]>((error: E) => [error, undefined]);
};
