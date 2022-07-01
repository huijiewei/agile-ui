export type Canceller = {
  id?: number;
};

export type Stage = 'from' | 'enter' | 'leave';

export const setAnimationFrameTimeout = (callback: () => void, timeout = 0) => {
  const startTime = performance.now();
  const canceller: Canceller = {};

  const call = () => {
    canceller.id = requestAnimationFrame((now) => {
      if (now - startTime > timeout) {
        callback();
      } else {
        call();
      }
    });
  };

  call();

  return canceller;
};

export const clearAnimationFrameTimeout = (canceller: Canceller) => {
  if (canceller.id) cancelAnimationFrame(canceller.id);
};
