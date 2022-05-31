import { useLocalStorage } from '../use-local-storage';
import { useMediaQuery } from '../use-media-query';
import { useUpdateEffect } from '../use-update-effect';

const COLOR_SCHEME_QUERY = '(prefers-color-scheme: dark)';

export const useDarkMode = (
  defaultValue?: boolean
): {
  isDarkMode: boolean;
  toggle: () => void;
  enable: () => void;
  disable: () => void;
} => {
  const isDarkOS = useMediaQuery(COLOR_SCHEME_QUERY);

  const [isDarkMode, setIsDarkMode] = useLocalStorage<boolean>('agile-ui-dark-mode', defaultValue ?? isDarkOS ?? false);

  useUpdateEffect(() => {
    setIsDarkMode(isDarkOS);
  }, [isDarkOS]);

  return {
    isDarkMode,
    toggle: () => setIsDarkMode((prev) => !prev),
    enable: () => setIsDarkMode(true),
    disable: () => setIsDarkMode(false),
  };
};
