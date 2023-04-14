import { useMemo, useSyncExternalStore } from 'react';
import { isBrowser } from '@agile-ui/utils';

export const useMediaQuery = (query: string) => {
  const [getSnapshot, subscribe] = useMemo(() => {
    const mediaQueryList = isBrowser() ? window.matchMedia(query) : null;

    return [
      () => mediaQueryList?.matches ?? false,

      (callback: () => void) => {
        if (!mediaQueryList) {
          return () => void 0;
        }

        mediaQueryList.addEventListener('change', callback);
        return () => {
          mediaQueryList.removeEventListener('change', callback);
        };
      },
    ];
  }, [query]);

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
};
