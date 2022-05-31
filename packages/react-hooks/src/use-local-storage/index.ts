import { isBrowser, isFunction } from '@agile-ui/utils';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useEventListener } from '../use-event-listener';

export const useLocalStorage = <T>(key: string, defaultValue: (() => T) | T): [T, Dispatch<SetStateAction<T>>] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (isBrowser()) {
      try {
        const item = window.localStorage.getItem(key);
        if (item) {
          return JSON.parse(item);
        }
      } catch (error) {
        console.warn(`Error reading localStorage key “${key}”:`, error);
      }
    }

    return isFunction(defaultValue) ? defaultValue() : defaultValue;
  });

  useEffect(() => {
    if (!isBrowser()) {
      return;
    }

    try {
      if (storedValue !== undefined) {
        window.localStorage.setItem(key, JSON.stringify(storedValue));
      } else {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.warn(`Error writing localStorage key “${key}”:`, error);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storedValue]);

  useEventListener('storage', (e: StorageEvent) => {
    if (e.key !== key || e.storageArea !== window.localStorage) {
      return;
    }

    setStoredValue(e.newValue ? JSON.parse(e.newValue) : undefined);
  });

  return [storedValue, setStoredValue];
};
