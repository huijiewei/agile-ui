import { Tooltip } from '@agile-ui/react';
import { useDarkMode } from '@agile-ui/react-hooks/src/use-dark-mode';
import { useEffect } from 'react';

export const ThemeSwitcher = () => {
  const { darkMode, toggle } = useDarkMode();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <Tooltip content={darkMode ? '进入亮色模式' : '进入暗色模式'}>
      <button
        onClick={toggle}
        className={'block border-slate-300 rounded p-1 border text-slate-500 hover:text-slate-700'}
      >
        {darkMode ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            stroke="currentColor"
            className={'h-5 w-5'}
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth={2}
            strokeLinejoin={'round'}
            strokeLinecap={'round'}
          >
            <path d="M0 0h24v24H0z" stroke="none" />
            <circle cx="12" cy="12" r="4" />
            <path d="M3 12h1m8-9v1m8 8h1m-9 8v1M5.6 5.6l.7.7m12.1-.7l-.7.7m0 11.4l.7.7m-12.1-.7l-.7.7" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={'h-5 w-5'}
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinejoin="round"
            strokeLinecap="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"></path>
          </svg>
        )}
      </button>
    </Tooltip>
  );
};
