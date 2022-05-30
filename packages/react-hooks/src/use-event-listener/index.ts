import { useIsomorphicLayoutEffect } from '../use-isomorphic-layout-effect';
import { useEffect, useRef } from 'react';

export const useEventListener = <
  KW extends keyof WindowEventMap,
  KH extends keyof HTMLElementEventMap,
  T extends HTMLElement = HTMLDivElement
>(
  event: KW | KH,
  handler: (event: WindowEventMap[KW] | HTMLElementEventMap[KH] | Event) => void,
  element?: T | null,
  options?: boolean | AddEventListenerOptions
) => {
  const savedHandler = useRef(handler);

  useIsomorphicLayoutEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const targetElement: T | Window = element || window;

    if (!(targetElement && targetElement.addEventListener)) {
      return;
    }

    const eventListener: typeof handler = (event) => savedHandler.current(event);

    targetElement.addEventListener(event, eventListener, options);
    return () => targetElement.removeEventListener(event, eventListener, options);
  }, [event, element, options]);
};
