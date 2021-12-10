import { useEffect, useMemo, useState } from 'react';

export const useLocalStorage = <T>(
  key: string,
  defaultValue?: T,
  options?: Partial<{
    serializer: (object: T | undefined) => string;
    parser: (val: string) => T | undefined;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    logger: (error: any) => void;
    syncData: boolean;
  }>
) => {
  const opts = useMemo(() => {
    return {
      serializer: JSON.stringify,
      parser: JSON.parse,
      logger: console.log,
      syncData: true,
      ...options,
    };
  }, [options]);

  const { serializer, parser, logger, syncData } = opts;

  const [storedValue, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      const res: T = item ? parser(item) : defaultValue;
      return res;
    } catch (e) {
      logger(e);
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, serializer(storedValue));
    } catch (e) {
      logger(e);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storedValue]);

  useEffect(() => {
    if (!syncData) {
      return;
    }

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key !== key || e.storageArea !== window.localStorage) {
        return;
      }

      try {
        setValue(e.newValue ? parser(e.newValue) : undefined);
      } catch (e) {
        logger(e);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, syncData]);

  return [storedValue, setValue];
};
