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
        onClick={() => darkModeDispatch((prev) => !prev)}
        className={'block border-slate-300 rounded p-1 border text-slate-500 hover:text-slate-700'}
      >
        {darkMode ? <Sun className={'h-5 w-5'} /> : <Moon className={'h-5 w-5'} />}
      </button>
    </Tooltip>
  );
};
