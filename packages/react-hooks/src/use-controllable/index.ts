import { MaybeFunction, runIfFn } from '@agile-ui/utils';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { useCallbackRef } from '../use-callback-ref';

export const useControllableProp = <T>(prop: T | undefined, state: T) => {
  const controlled = prop !== undefined;
  const value = controlled ? prop : state;

  return [controlled, value] as const;
};

export type UseControllableStateProps<T> = {
  value?: T;
  defaultValue?: MaybeFunction<T>;
  onChange?: (value: T) => void;
  shouldUpdate?: (prev: T, next: T) => boolean;
};

export const useControllableState = <T>(props: UseControllableStateProps<T>) => {
  const { value, defaultValue, onChange, shouldUpdate = (prev, next) => prev !== next } = props;

  const shouldUpdateProp = useCallbackRef(shouldUpdate);
  const handleChange = useCallbackRef(onChange);

  const [valueState, setValueState] = useState(defaultValue as T);

  const controlled = value !== undefined;
  const state = controlled ? (value as T) : valueState;

  const setValue = useCallback(
    (next: SetStateAction<T>) => {
      const nextValue = runIfFn(next, state);

      if (!shouldUpdateProp(state, nextValue)) {
        return;
      }

      if (!controlled) {
        setValueState(nextValue);
      }

      handleChange(nextValue);
    },
    [controlled, handleChange, shouldUpdateProp, state]
  );

  return [state, setValue] as [T, Dispatch<SetStateAction<T>>];
};
