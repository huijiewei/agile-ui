import { useLocalStorage } from '../use-local-storage';
import { useMediaQuery } from '../use-media-query';
import { useUpdateEffect } from '../use-update-effect';

const COLOR_SCHEME_QUERY = '(prefers-color-scheme: dark)';

export const useDarkMode = (
  defaultValue?: boolean
): {
  darkMode: boolean;
  toggle: () => void;
  enable: () => void;
  disable: () => void;
} => {
  const isDarkOS = useMediaQuery(COLOR_SCHEME_QUERY);

  const [darkMode, setDarkMode] = useLocalStorage<boolean>('agile-ui-dark-mode', defaultValue ?? isDarkOS ?? false);

  useUpdateEffect(() => {
    setDarkMode(isDarkOS);
  }, [isDarkOS]);

  return {
    darkMode,
    toggle: () => setDarkMode((prev) => !prev),
    enable: () => setDarkMode(true),
    disable: () => setDarkMode(false),
  };
};
