import { useIsomorphicLayoutEffect } from '@agile-ui/react-hooks';
import { RefObject, useEffect, useRef } from 'react';

export const useEventListener = <
  KW extends keyof WindowEventMap,
  KH extends keyof HTMLElementEventMap,
  T extends HTMLElement = HTMLDivElement
>(
  event: KW | KH,
  listener: (event: WindowEventMap[KW] | HTMLElementEventMap[KH] | Event) => void,
  element?: RefObject<T>,
  options?: boolean | AddEventListenerOptions
) => {
  const savedListener = useRef(listener);

  useIsomorphicLayoutEffect(() => {
    savedListener.current = listener;
  }, [listener]);

  useEffect(() => {
    const targetElement: T | Window = element?.current || window;

    if (!(targetElement && targetElement.addEventListener)) {
      return;
    }

    const eventListener: typeof listener = (event) => savedListener.current(event);

    targetElement.addEventListener(event, eventListener, options);
    return () => targetElement.removeEventListener(event, eventListener, options);
  }, [event, element, options]);
};
