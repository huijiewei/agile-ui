export const sleep = (delay: number): Promise<null> => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

export const to = <T, E>(promise: Promise<T>): Promise<{ data: T | undefined; error: E | undefined }> => {
  return promise.then((data) => ({ data, error: undefined })).catch((error) => ({ data: undefined, error }));
};
