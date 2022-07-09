import { MaybeFunction, runIfFn } from '@agile-ui/utils';
import { Dispatch, SetStateAction, useState } from 'react';
import { useEventListener } from '../use-event-listener';

export const useLocalStorage = <T>(key: string, initialValue: MaybeFunction<T>): [T, Dispatch<SetStateAction<T>>] => {
  const readValue = () => {
    try {
      const item = window.localStorage.getItem(key);

      if (item != null) {
        return JSON.parse(item);
      }
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error);
    }

    return runIfFn(initialValue);
  };

  const [state, setState] = useState<T>(readValue);

  const setValue: Dispatch<SetStateAction<T>> = (value) => {
    const newValue = runIfFn(value, state);

    setState(newValue);

    try {
      if (newValue != undefined) {
        window.localStorage.setItem(key, JSON.stringify(newValue));
      } else {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.warn(`Error writing localStorage key “${key}”:`, error);
    }
  };

  useEventListener('storage', (e: StorageEvent) => {
    if (e.key !== key || e.storageArea !== window.localStorage) {
      return;
    }

    setState(e.newValue ? JSON.parse(e.newValue) : undefined);
  });

  return [state, setValue];
};
