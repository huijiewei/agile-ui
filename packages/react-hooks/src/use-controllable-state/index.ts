import { MaybeFunction, runIfFn } from '@agile-ui/utils';
import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import { useCallbackRef } from '../use-callback-ref';

export type UseControllableStateProps<T> = {
  value?: T;
  defaultValue?: MaybeFunction<T>;
  onChange?: (value: T) => void;
};

export const useUncontrolledState = <T>(props: Omit<UseControllableStateProps<T>, 'value'>) => {
  const { defaultValue, onChange } = props;

  const [state, setState] = useState<T | undefined>(defaultValue);

  const prevStateRef = useRef(state);
  const handleChange = useCallbackRef(onChange);

  useEffect(() => {
    if (prevStateRef.current !== state) {
      handleChange(state as T);
      prevStateRef.current = state;
    }
  }, [state, prevStateRef, handleChange]);

  return [state, setState] as const;
};

export const useControllableState = <T>(props: UseControllableStateProps<T>) => {
  const { value, defaultValue, onChange } = props;

  const [uncontrolledState, setUncontrolledState] = useUncontrolledState({ defaultValue, onChange });

  const isControlled = value !== undefined;
  const state = isControlled ? value : uncontrolledState;

  const handleChange = useCallbackRef(onChange);

  const setState: Dispatch<SetStateAction<T | undefined>> = useCallback(
    (nextValue) => {
      if (isControlled) {
        const state = runIfFn(nextValue, value);

        if (state != value) {
          handleChange(state as T);
        }
      } else {
        setUncontrolledState(nextValue);
      }
    },
    [isControlled, value, setUncontrolledState, handleChange]
  );

  return [state, setState] as const;
};
