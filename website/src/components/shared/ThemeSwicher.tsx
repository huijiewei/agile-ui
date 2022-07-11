import { Tooltip, useColorModeDispatch, useColorModeState } from '@agile-ui/react';
import { Computer, Moon, Sun } from '@agile-ui/react-icons';

export const ThemeSwitcher = () => {
  const { colorMode } = useColorModeState();
  const toggleColorMode = useColorModeDispatch();

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
