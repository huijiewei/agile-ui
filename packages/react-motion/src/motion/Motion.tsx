import { createMotionState, createStyles } from '@motionone/dom';
import type { Options } from '@motionone/dom';
import { createElement, forwardRef, MutableRefObject, useContext, useEffect, useMemo, useRef } from 'react';
import type { CSSProperties, ForwardedRef } from 'react';
import { usePresence } from '../presence/usePresence';
import { MotionContext } from './MotionContext';
import { useEvents } from './useEvents';
import type { MotionEventHandlers } from './useEvents';

type ElementProps = {
  style: CSSProperties;
};

type MotionComponentProps = MotionEventHandlers & Options;

const createMotionComponent = <Props extends ElementProps>(Component: string) => {
  const Motion = (
    {
      initial,
      animate,
      press,
      hover,
      inView,
      inViewOptions,
      variants,
      style,
      transition,
      onMotionStart,
      onMotionComplete,
      onHoverStart,
      onHoverEnd,
      onPressStart,
      onPressEnd,
      onViewEnter,
      onViewLeave,
      ...props
    }: MotionComponentProps & Props,
    externalRef: ForwardedRef<Element>
  ): JSX.Element => {
    const options = {
      initial,
      animate,
      press,
      hover,
      inView,
      inViewOptions,
      variants,
      transition,
    };

    const [isPresent, safeToRemove] = usePresence();

    const state = createMotionState(options, useContext(MotionContext));

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const initialStyle = useMemo(() => createStyles(state.getTarget()), []);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const ref = (externalRef as MutableRefObject<Element>) || useRef<Element>(null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => state.mount(ref.current), []);
    useEffect(() => state.update(options));

    useEvents(ref, {
      onMotionStart,
      onMotionComplete,
      onHoverStart,
      onHoverEnd,
      onPressStart,
      onPressEnd,
      onViewEnter,
      onViewLeave,
    });

    const element = createElement(Component, {
      ...props,
      ref,
      style: { ...style, ...initialStyle },
    });

    return <MotionContext.Provider value={state}>{element}</MotionContext.Provider>;
  };

  return forwardRef(Motion);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const components = new Map<string, any>();

type MotionComponent = {
  (props: JSX.IntrinsicElements['div'] & MotionComponentProps): JSX.Element;
  <T extends keyof JSX.IntrinsicElements>(
    props: JSX.IntrinsicElements[T] & MotionComponentProps & { tag: T }
  ): JSX.Element;
};

type MotionProxyComponent<T> = (props: T & MotionComponentProps) => JSX.Element;

type MotionProxy = MotionComponent & {
  [K in keyof JSX.IntrinsicElements]: MotionProxyComponent<JSX.IntrinsicElements[K]>;
};

export const Motion = new Proxy(
  {},
  {
    get: (_, key: string) => {
      !components.has(key) && components.set(key, createMotionComponent(key));

      return components.get(key);
    },
  }
) as MotionProxy;
