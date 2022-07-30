import { useIsomorphicLayoutEffect } from '../use-isomorphic-layout-effect';
import { useEffect, useRef } from 'react';

export type Target = HTMLElement | Element | Window | Document;

type Options<T extends Target = Target> = {
  target?: T | null;
  capture?: boolean;
  once?: boolean;
  passive?: boolean;
};

type UseEventListener = {
  <K extends keyof HTMLElementEventMap>(
    eventName: K,
    handler: (event: HTMLElementEventMap[K]) => void,
    options?: Options<HTMLElement>
  ): void;
  <K extends keyof ElementEventMap>(
    eventName: K,
    handler: (event: ElementEventMap[K]) => void,
    options?: Options<Element>
  ): void;
  <K extends keyof DocumentEventMap>(
    eventName: K,
    handler: (event: DocumentEventMap[K]) => void,
    options?: Options<Document>
  ): void;
  <K extends keyof WindowEventMap>(
    eventName: K,
    handler: (event: WindowEventMap[K]) => void,
    options?: Options<Window>
  ): void;
};

export const useEventListener: UseEventListener = (
  eventName: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handler: (event: any) => void,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: Options = {}
) => {
  const handlerRef = useRef(handler);

  useIsomorphicLayoutEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    const targetElement = options?.target || window;

    if (!targetElement?.addEventListener) {
      return;
    }

    const eventListener: typeof handler = (event) => {
      return handlerRef.current(event);
    };

    targetElement.addEventListener(eventName, eventListener, {
      capture: options.capture,
      once: options.once,
      passive: options.passive,
    });

    return () => {
      targetElement.removeEventListener(eventName, eventListener, {
        capture: options.capture,
      });
    };
  }, [eventName, options]);
};
