import { Tooltip, useColorModeDispatch, useColorModeState } from '@agile-ui/react';
import { Moon, Sun } from '@agile-ui/react-icons';
import { useEffect } from 'react';

export const ThemeSwitcher = () => {
  const colorModeState = useColorModeState();
  const colorModeDispatch = useColorModeDispatch();

  useEffect(() => {
    if (colorModeState) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [colorModeState]);

  return (
    <Tooltip placement={'bottom'} content={colorModeState ? '进入亮色模式' : '进入暗色模式'}>
      <button
        aria-label={colorModeState ? '黑暗模式' : '亮色模式'}
        onClick={() => colorModeDispatch((prev) => !prev)}
        className={'block border-gray-300 rounded select-none p-1 border text-gray-400 hover:text-gray-500'}
      >
        {colorModeState ? <Sun size={5} /> : <Moon size={5} />}
      </button>
    </Tooltip>
  );
};
