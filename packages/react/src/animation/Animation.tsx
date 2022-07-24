import { __DEV__ } from '@agile-ui/utils';
import { useEffect, useRef, useState } from 'react';
import { cx } from 'twind';
import { polymorphicComponent } from '../utils/component';
import { usePresence } from './usePresence';

export type AnimationProps = {
  enter?: string;
  exit?: string;
  duration?: number;
  transition?: string;
};

type Canceller = {
  id?: number;
};

type Stage = 'from' | 'enter' | 'leave';

const setAnimationFrameTimeout = (callback: () => void, timeout = 0) => {
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

const clearAnimationFrameTimeout = (canceller: Canceller) => {
  if (canceller.id) cancelAnimationFrame(canceller.id);
};

export const Animation = polymorphicComponent<'div', AnimationProps>((props, ref) => {
  const {
    as: Component = 'div',
    className,
    enter = 'opacity-100',
    exit = 'opacity-0',
    duration = 200,
    transition = 'opacity',
    children,
    ...rest
  } = props;

  const [isPresent, safeToRemove] = usePresence();

  const [stage, setStage] = useState<Stage>('from');

  const timer = useRef<Canceller>({});

  useEffect(() => {
    clearAnimationFrameTimeout(timer.current);

    if (isPresent) {
      setStage('from');
      timer.current = setAnimationFrameTimeout(() => {
        setStage('enter');
      });
    } else {
      setStage('leave');
      timer.current = setAnimationFrameTimeout(() => {
        !isPresent && safeToRemove?.();
      }, duration);
    }

    return () => {
      clearAnimationFrameTimeout(timer.current);
    };
  }, [duration, isPresent, safeToRemove]);

  return (
    <Component
      className={cx(className, `duration-[${duration}ms] transition-${transition}`, stage == 'enter' ? enter : exit)}
      ref={ref}
      {...rest}
    >
      {children}
    </Component>
  );
});

if (__DEV__) {
  Animation.displayName = 'Motion';
}
