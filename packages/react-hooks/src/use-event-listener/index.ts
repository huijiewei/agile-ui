import { RefObject, useEffect } from 'react';
import { isBrowser } from '@agile-ui/utils';
import { useCallbackRef } from '../use-callback-ref';

type UseEventListener = {
  <K extends keyof HTMLElementEventMap, T extends HTMLElement = HTMLDivElement>(
    eventName: K,
    handler: (event: HTMLElementEventMap[K]) => void,
    element: RefObject<T> | T | null,
    options?: boolean | AddEventListenerOptions
  ): void;
  <K extends keyof ElementEventMap, T extends Element>(
    eventName: K,
    handler: (event: ElementEventMap[K]) => void,
    element: RefObject<T> | T | null,
    options?: boolean | AddEventListenerOptions
  ): void;
  <K extends keyof DocumentEventMap>(
    eventName: K,
    handler: (event: DocumentEventMap[K]) => void,
    element: RefObject<Document> | Document,
    options?: boolean | AddEventListenerOptions
  ): void;
  <K extends keyof WindowEventMap>(
    eventName: K,
    handler: (event: WindowEventMap[K]) => void,
    element?: undefined,
    options?: boolean | AddEventListenerOptions
  ): void;
};

export const useEventListener: UseEventListener = (
  eventName: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handler: (event: any) => void,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  element?: any,
  options?: boolean | AddEventListenerOptions
) => {
  const listener = useCallbackRef(handler);

  useEffect(() => {
    if (!isBrowser()) {
      return;
    }

    const targetElement = !element ? window : 'current' in element ? element.current : element;

    if (!targetElement?.addEventListener) {
      return;
    }

    targetElement.addEventListener(eventName, listener, options);

    return () => {
      targetElement.removeEventListener(eventName, listener);
    };
  }, [element, eventName, listener, options]);
};
