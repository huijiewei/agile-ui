import { isBrowser, isFunction } from '@agile-ui/utils';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useEventListener } from '../use-event-listener';

export const useLocalStorage = <T>(name: string, initialValue: (() => T) | T): [T, Dispatch<SetStateAction<T>>] => {
  const [state, setState] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(name);

      if (item != null) {
        return JSON.parse(item);
      }
    } catch (error) {
      console.warn(`Error reading localStorage key “${name}”:`, error);
    }

    return isFunction(initialValue) ? initialValue() : initialValue;
  });

  useEffect(() => {
    if (!isBrowser()) {
      return;
    }

    try {
      if (state != undefined) {
        window.localStorage.setItem(name, JSON.stringify(state));
      } else {
        window.localStorage.removeItem(name);
      }
    } catch (error) {
      console.warn(`Error writing localStorage key “${name}”:`, error);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  useEventListener('storage', (e: StorageEvent) => {
    if (e.key !== name || e.storageArea !== window.localStorage) {
      return;
    }

    setState(e.newValue ? JSON.parse(e.newValue) : undefined);
  });

  return [state, setState];
};
