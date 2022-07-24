import type { CustomPointerEvent, MotionEvent, ViewEvent } from '@motionone/dom';
import type { RefObject } from 'react';
import { useEffect } from 'react';

export type MotionEventHandlers = {
  onMotionStart?: (event: MotionEvent) => void;
  onMotionComplete?: (event: MotionEvent) => void;
  onHoverStart?: (event: CustomPointerEvent) => void;
  onHoverEnd?: (event: CustomPointerEvent) => void;
  onPressStart?: (event: CustomPointerEvent) => void;
  onPressEnd?: (event: CustomPointerEvent) => void;
  onViewEnter?: (event: ViewEvent) => void;
  onViewLeave?: (event: ViewEvent) => void;
};

export const addDomEvent = (
  target: EventTarget,
  eventName: string,
  handler: EventListener,
  options?: AddEventListenerOptions
) => {
  target.addEventListener(eventName, handler, options);

  return () => target.removeEventListener(eventName, handler, options);
};

const domEventName = (propName: string) => propName.replace('on', '').toLowerCase();

export const useEvents = (ref: RefObject<Element>, handlers: MotionEventHandlers) => {
  useEffect(() => {
    const subscriptions = Object.keys(handlers).map((name) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return addDomEvent(ref.current, domEventName(name), handlers[name]);
    });

    return () => {
      subscriptions.forEach((subscription) => subscription());
    };
  });
};
