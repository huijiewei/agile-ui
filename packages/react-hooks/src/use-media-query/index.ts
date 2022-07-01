import { useMemo, useSyncExternalStore } from 'react';

export const useMediaQuery = (query: string) => {
  const [getSnapshot, subscribe] = useMemo(() => {
    const mediaQueryList = window.matchMedia(query);

    return [
      () => mediaQueryList.matches,

      (callback: () => void) => {
        mediaQueryList.addEventListener('change', callback);
        return () => {
          mediaQueryList.removeEventListener('change', callback);
        };
      },
    ];
  }, [query]);

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
};
