import { useEffect, useRef, useState } from 'react';
import { clearAnimationFrameTimeout, setAnimationFrameTimeout } from './helper';
import type { Canceller, Stage } from './helper';

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
