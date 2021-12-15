import { useLayoutEffect } from 'react';
import { useCallbackRef } from '../use-callback-ref';

export const useResizeObserver = (element: HTMLElement | null, onResize: () => void) => {
  const handleResize = useCallbackRef(onResize);
  useLayoutEffect(() => {
    let rAF = 0;
    if (element) {
      const resizeObserver = new ResizeObserver(() => {
        cancelAnimationFrame(rAF);
        rAF = window.requestAnimationFrame(handleResize);
      });
      resizeObserver.observe(element);
      return () => {
        window.cancelAnimationFrame(rAF);
        resizeObserver.unobserve(element);
      };
    }
  }, [element, handleResize]);
};
