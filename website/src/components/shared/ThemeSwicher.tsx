import { Tooltip, useDarkModeDispatch, useDarkModeState } from '@agile-ui/react';
import { Moon, Sun } from '@agile-ui/react-icons';
import { useEffect } from 'react';

export const ThemeSwitcher = () => {
  const darkMode = useDarkModeState();
  const darkModeDispatch = useDarkModeDispatch();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <Tooltip placement={'bottom'} content={darkMode ? '进入亮色模式' : '进入暗色模式'}>
      <button
        aria-label={darkMode ? '黑暗模式' : '亮色模式'}
        onClick={() => darkModeDispatch((prev) => !prev)}
        className={
          'block border-gray-300 rounded select-none p-1 border text-gray-500 hover:text-gray-700 dark:(text-gray-300 hover:text-gray-400)'
        }
      >
        {darkMode ? <Sun className={'h-5 w-5'} /> : <Moon className={'h-5 w-5'} />}
      </button>
    </Tooltip>
  );
};
