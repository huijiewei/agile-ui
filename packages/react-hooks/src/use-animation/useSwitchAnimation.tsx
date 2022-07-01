import { Dispatch, Fragment, MutableRefObject, ReactNode, SetStateAction, useEffect, useRef, useState } from 'react';
import type { Canceller, Stage } from './utils';
import { clearAnimationFrameTimeout, setAnimationFrameTimeout } from './utils';

export type Mode = 'default' | 'out-in' | 'in-out';

type ListItem<S> = {
  state: S;
  key: number;
  stage: Stage;
};

type ModeHookParam<S> = {
  state: S;
  timeout: number;
  mode?: Mode;
  keyRef: MutableRefObject<number>;
  list: ListItem<S>[];
  setList: Dispatch<SetStateAction<ListItem<S>[]>>;
};

const useDefaultMode = <S,>({ state, timeout, mode, keyRef, list, setList }: ModeHookParam<S>) => {
  useEffect(() => {
    if (mode !== undefined && mode !== 'default') {
      return;
    }

    const [lastItem] = list.slice(-1);

    if (lastItem.state === state) {
      return;
    }

    const prevKey = keyRef.current;
    keyRef.current++;
    const curKey = keyRef.current;

    setList((prev) => prev.concat({ state, key: curKey, stage: 'from' }));

    const isCurItem = (item: ListItem<S>) => item.key === curKey;

    setTimeout(() => {
      setList((prev) => prev.map((item) => (isCurItem(item) ? { ...item, stage: 'enter' } : item)));
    });

    const shouldItemLeave = (item: ListItem<S>) => item.key === prevKey;

    setList((prev) => prev.map((item) => (shouldItemLeave(item) ? { ...item, stage: 'leave' } : item)));

    const shouldMountItem = (item: ListItem<S>) => item.key !== prevKey;

    setTimeout(() => {
      setList((prev) => prev.filter(shouldMountItem));
    }, timeout);
  }, [keyRef, list, mode, setList, state, timeout]);
};

const useOutInMode = <S,>({ state, timeout, mode, keyRef, list, setList }: ModeHookParam<S>) => {
  const timerRef = useRef<Canceller>({});

  useEffect(() => {
    if (mode !== 'out-in') {
      return;
    }

    const [lastItem] = list.slice(-1);

    if (lastItem.state !== state && lastItem.stage === 'enter') {
      setList([{ ...lastItem, stage: 'leave' }]);
    }

    if (lastItem.state !== state && lastItem.stage === 'leave') {
      clearAnimationFrameTimeout(timerRef.current);
      timerRef.current = setAnimationFrameTimeout(() => {
        keyRef.current++;
        setList([{ state, key: keyRef.current, stage: 'from' }]);
      }, timeout);
    }

    if (lastItem.state === state && lastItem.stage === 'from') {
      setAnimationFrameTimeout(() => {
        setList((prev) => [{ ...prev[0], stage: 'enter' }]);
      });
    }

    return () => {
      clearAnimationFrameTimeout(timerRef.current);
    };
  }, [keyRef, list, mode, setList, state, timeout]);
};

const useInOutMode = <S,>({ state, timeout, mode, keyRef, list, setList }: ModeHookParam<S>) => {
  const timerRefFirst = useRef<Canceller>({});
  const timerRefSecond = useRef<Canceller>({});

  useEffect(() => {
    if (mode !== 'in-out') {
      return;
    }

    const [lastItem, secondLastItem] = list.reverse();

    if (lastItem.state !== state && lastItem.stage === 'enter') {
      keyRef.current++;
      setList((prev) => prev.slice(-1).concat({ state, key: keyRef.current, stage: 'from' }));
    }

    if (lastItem.state === state && lastItem.stage === 'from') {
      setAnimationFrameTimeout(() => {
        setList([secondLastItem, { ...lastItem, stage: 'enter' }]);
      });
    }

    if (lastItem.state === state && lastItem.stage === 'enter' && secondLastItem.stage === 'enter') {
      clearAnimationFrameTimeout(timerRefFirst.current);
      timerRefFirst.current = setAnimationFrameTimeout(() => {
        setList([{ ...secondLastItem, stage: 'leave' }, lastItem]);
      }, timeout);
    }

    if (secondLastItem.stage === 'leave') {
      clearAnimationFrameTimeout(timerRefSecond.current);
      timerRefSecond.current = setAnimationFrameTimeout(() => {
        setList([lastItem]);
      }, timeout);
    }

    return () => {
      clearAnimationFrameTimeout(timerRefFirst.current);
      clearAnimationFrameTimeout(timerRefSecond.current);
    };
  }, [keyRef, list, mode, setList, state, timeout]);
};

type RenderCallback<S> = (state: S, stage: Stage) => ReactNode;

export const useSwitchAnimation = <S,>(state: S, timeout: number, mode?: Mode) => {
  const keyRef = useRef(0);

  const firstDefaultItem: ListItem<S> = {
    state,
    key: keyRef.current,
    stage: 'enter',
  };

  const [list, setList] = useState([firstDefaultItem]);

  useDefaultMode({ state, timeout, keyRef, mode, list, setList });

  useOutInMode({ state, timeout, keyRef, mode, list, setList });

  useInOutMode({ state, timeout, keyRef, mode, list, setList });

  return (renderCallback: RenderCallback<S>) => {
    return list.map((item) => <Fragment key={item.key}>{renderCallback(item.state, item.stage)}</Fragment>);
  };
};
