import { useEffect, useRef, useState } from 'react';

export type Canceller = {
  id?: number;
};

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

export type Stage = 'from' | 'enter' | 'leave';

export const useAnimation = (state: boolean, timeout: number) => {
  // the stage of animation - 'from' | 'enter' | 'leave'
  const [stage, setStage] = useState<Stage>(state ? 'enter' : 'from');

  const timer = useRef<Canceller>({});
  const [shouldMount, setShouldMount] = useState(state);

  useEffect(() => {
    clearAnimationFrameTimeout(timer.current);

    if (state) {
      setStage('from');
      setShouldMount(true);
      timer.current = setAnimationFrameTimeout(() => {
        setStage('enter');
      });
    } else {
      setStage('leave');
      timer.current = setAnimationFrameTimeout(() => {
        setShouldMount(false);
      }, timeout);
    }

    return () => {
      clearAnimationFrameTimeout(timer.current);
    };
  }, [state, timeout]);

  return {
    stage,
    shouldMount,
  };
};
