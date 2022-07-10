import { Tooltip, useColorModeDispatch, useColorModeState } from '@agile-ui/react';
import { Computer, Moon, Sun } from '@agile-ui/react-icons';
import { useEffect } from 'react';

export const ThemeSwitcher = () => {
  const { darkMode, colorMode } = useColorModeState();
  const toggleColorMode = useColorModeDispatch();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const colorModeTitle = {
    dark: '黑暗模式',
    light: '亮色模式',
    system: '跟随系统',
  };

  return (
    <Tooltip placement={'bottom'} content={colorModeTitle[colorMode]}>
      <button
        aria-label={colorModeTitle[colorMode]}
        onClick={() => toggleColorMode()}
        className={'block select-none p-1 text-gray-400 hover:text-gray-500'}
      >
        {colorMode == 'system' && <Computer size={5} />}
        {colorMode == 'light' && <Sun size={5} />}
        {colorMode == 'dark' && <Moon size={5} />}
      </button>
    </Tooltip>
  );
};
