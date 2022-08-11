import { useIsomorphicLayoutEffect } from '../use-isomorphic-layout-effect';
import { RefObject, useEffect, useRef } from 'react';
import { isBrowser } from '@agile-ui/utils';

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: boolean | AddEventListenerOptions
) => {
  const handlerRef = useRef(handler);

  useIsomorphicLayoutEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!isBrowser()) {
      return;
    }

    const targetElement = !element ? window : 'current' in element ? element.current : element;

    if (!targetElement?.addEventListener) {
      return;
    }

    const eventListener: typeof handler = (event) => handlerRef.current(event);

    targetElement.addEventListener(eventName, eventListener, options);

    return () => {
      targetElement.removeEventListener(eventName, eventListener);
    };
  }, [element, eventName, options]);
};
