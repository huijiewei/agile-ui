import {
  DropdownMenu,
  DropdownMenuArrow,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  useColorModeDispatch,
  useColorModeState,
} from '@agile-ui/react';
import { Moon, Sun, System } from '@agile-ui/react-icons';
import { cx } from '@twind/core';

export const ThemeSwitcher = () => {
  const { colorMode } = useColorModeState();
  const { setColorMode } = useColorModeDispatch();

  const colorModeTitle = {
    dark: '黑暗模式',
    light: '亮色模式',
    system: '跟随系统',
  };

  return (
    <DropdownMenu placement={'bottom'}>
      <DropdownMenuTrigger>
        <button
          aria-label={colorModeTitle[colorMode]}
          className={'block select-none transition-colors p-1 text-gray-400 hover:text-gray-500'}
        >
          {colorMode == 'system' && <System size={5} />}
          {colorMode == 'light' && <Sun size={5} />}
          {colorMode == 'dark' && <Moon size={5} />}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={'z-50'}>
        <DropdownMenuArrow />
        <DropdownMenuItem
          className={cx('my-1', colorMode == 'light' && 'text-blue-500')}
          onClick={() => {
            setColorMode('light');
          }}
        >
          <div className={'flex gap-1 items-center'}>
            <Sun /> 亮色模式
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          className={cx('my-1', colorMode == 'dark' && 'text-blue-500')}
          onClick={() => {
            setColorMode('dark');
          }}
        >
          <div className={'flex gap-1 items-center'}>
            <Moon /> 暗色模式
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          className={cx('my-1', colorMode == 'system' && 'text-blue-500')}
          onClick={() => {
            setColorMode('system');
          }}
        >
          <div className={'flex gap-1 items-center'}>
            <System /> 跟随系统
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
