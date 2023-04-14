import { isBrowser, MaybeFunction, runIfFn } from '@agile-ui/utils';
import { Dispatch, SetStateAction, useState } from 'react';
import { useEventListener } from '../use-event-listener';

export const useLocalStorage = <T>(key: string, initialValue: MaybeFunction<T>): [T, Dispatch<SetStateAction<T>>] => {
  const readValue = () => {
    if (!isBrowser()) {
      return runIfFn(initialValue);
    }

    const item = window.localStorage.getItem(key);

    if (item != null) {
      return JSON.parse(item);
    }

    return runIfFn(initialValue);
  };

  const [state, setState] = useState<T>(readValue);

  const setValue: Dispatch<SetStateAction<T>> = (value) => {
    const newValue = runIfFn(value, state);

    setState(newValue);

    if (!isBrowser()) {
      return;
    }

    if (newValue != undefined) {
      window.localStorage.setItem(key, JSON.stringify(newValue));
    } else {
      window.localStorage.removeItem(key);
    }
  };

  useEventListener('storage', (event: StorageEvent) => {
    if (event.key !== key || event.storageArea !== window.localStorage) {
      return;
    }

    setState(event.newValue ? JSON.parse(event.newValue) : undefined);
  });

  return [state, setValue];
};
