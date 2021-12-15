import { useMergedRef, useStateMachine } from '@agile-ui/react-hooks';
import { Children, cloneElement, ReactElement, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

export type PresenceProps = {
  present: boolean;
  children: ReactElement | ((props: { present: boolean }) => ReactElement);
};

export const Presence = (props: PresenceProps) => {
  const { present, children } = props;
  const presence = usePresence(present);

  const child = (
    typeof children === 'function' ? children({ present: presence.isPresent }) : Children.only(children)
  ) as ReactElement;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useMergedRef(presence.ref, (child as any).ref);
  const forceMount = typeof children === 'function';

  return forceMount || presence.isPresent ? cloneElement(child, { ref }) : null;
};

const usePresence = (present: boolean) => {
  const [node, setNode] = useState<HTMLElement>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const stylesRef = useRef<CSSStyleDeclaration>({} as any);
  const prevPresentRef = useRef(present);
  const prevAnimationNameRef = useRef<string>('none');
  const initialState = present ? 'mounted' : 'unmounted';

  const [state, send] = useStateMachine(initialState, {
    mounted: {
      UNMOUNT: 'unmounted',
      ANIMATION_OUT: 'unmountSuspended',
    },
    unmountSuspended: {
      MOUNT: 'mounted',
      ANIMATION_END: 'unmounted',
    },
    unmounted: {
      MOUNT: 'mounted',
    },
  });

  useEffect(() => {
    const currentAnimationName = getAnimationName(stylesRef.current);
    prevAnimationNameRef.current = state === 'mounted' ? currentAnimationName : 'none';
  }, [state]);

  useLayoutEffect(() => {
    const styles = stylesRef.current;
    const wasPresent = prevPresentRef.current;
    const hasPresentChanged = wasPresent !== present;

    if (hasPresentChanged) {
      const prevAnimationName = prevAnimationNameRef.current;
      const currentAnimationName = getAnimationName(styles);

      if (present) {
        send('MOUNT');
      } else if (currentAnimationName === 'none' || styles?.display === 'none') {
        send('UNMOUNT');
      } else {
        const isAnimating = prevAnimationName !== currentAnimationName;

        if (wasPresent && isAnimating) {
          send('ANIMATION_OUT');
        } else {
          send('UNMOUNT');
        }
      }

      prevPresentRef.current = present;
    }
  }, [present, send]);

  useLayoutEffect(() => {
    if (node) {
      const handleAnimationEnd = (event: AnimationEvent) => {
        const currentAnimationName = getAnimationName(stylesRef.current);
        const isCurrentAnimation = currentAnimationName.includes(event.animationName);
        if (event.target === node && isCurrentAnimation) {
          send('ANIMATION_END');
        }
      };
      const handleAnimationStart = (event: AnimationEvent) => {
        if (event.target === node) {
          // if animation occurred, store its name as the previous animation.
          prevAnimationNameRef.current = getAnimationName(stylesRef.current);
        }
      };
      node.addEventListener('animationstart', handleAnimationStart);
      node.addEventListener('animationcancel', handleAnimationEnd);
      node.addEventListener('animationend', handleAnimationEnd);
      return () => {
        node.removeEventListener('animationstart', handleAnimationStart);
        node.removeEventListener('animationcancel', handleAnimationEnd);
        node.removeEventListener('animationend', handleAnimationEnd);
      };
    }
  }, [node, send]);

  return {
    isPresent: ['mounted', 'unmountSuspended'].includes(state),
    ref: useCallback((node: HTMLElement) => {
      if (node) stylesRef.current = getComputedStyle(node);
      setNode(node);
    }, []),
  };
};

const getAnimationName = (styles?: CSSStyleDeclaration) => {
  return styles?.animationName || 'none';
};
