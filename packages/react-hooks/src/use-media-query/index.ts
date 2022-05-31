import { isBrowser } from '@agile-ui/utils';
import { useEffect, useState } from 'react';

export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState<boolean>(() => {
    if (!isBrowser()) {
      return false;
    }

    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (!isBrowser()) {
      return;
    }

    const matchMedia = window.matchMedia(query);

    const handleChange = () => {
      setMatches(matchMedia.matches);
    };

    handleChange();

    matchMedia.addEventListener('change', handleChange);

    return () => {
      matchMedia.removeEventListener('change', handleChange);
    };
  }, [query]);

  return matches;
};
