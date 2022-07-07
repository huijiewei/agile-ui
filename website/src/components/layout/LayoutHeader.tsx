import { Tooltip, VisuallyHidden } from '@agile-ui/react';
import { Close, Github, Menu } from '@agile-ui/react-icons';
import LogoImage from '../../assets/images/logo.svg';
import { ThemeSwitcher } from '../shared/ThemeSwicher';
import { useLayerDispatch, useLayerState } from './Layout';

export const LayoutHeader = () => {
  const layer = useLayerState();
  const layerDispatch = useLayerDispatch();

  return (
    <header
      className={
        'sticky h-16 top-0 z-30 w-full border-b border-gray-100 dark:border-gray-700 bg-opacity-70 py-3 backdrop-blur'
      }
    >
      <div className={'mx-auto flex max-w-7xl items-center justify-between px-3 tablet:px-5'}>
        <button
          onClick={() => layerDispatch((prev) => !prev)}
          className={
            'block tablet:hidden p-2 appearance-none select-none text-gray-500 hover:text-gray-700 dark:(text-gray-300 hover:text-gray-400)'
          }
          type={'button'}
        >
          {layer ? <Close size={5} /> : <Menu size={5} />}
        </button>
        <div className={'flex flex-row items-center'}>
          <img
            width={'36'}
            height={'36'}
            className={'inline-block align-middle mt-[1px] -mb-[1px]'}
            alt={'Agile UI'}
            src={LogoImage}
          />
          <span className={'ml-1.5 inline-block align-middle text-[1.5rem] font-bold'}>Agile UI</span>
          <span
            className={
              'ml-3 hidden tablet:inline-block rounded-sm bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 align-middle text-xs font-bold text-red-900'
            }
          >
            ALPHA
          </span>
        </div>
        <div className={'flex flex-row items-center gap-2'}>
          <ThemeSwitcher />
          <Tooltip placement={'bottom'} content={'Github 上的 Agile UI'}>
            <a
              className={
                'block border-gray-300 rounded p-1 border text-gray-500 select-none hover:text-gray-700 dark:(text-gray-300 hover:text-gray-400)'
              }
              rel="noreferrer"
              href="https://github.com/huijiewei/agile-ui"
              target="_blank"
            >
              <VisuallyHidden>Github 上的 Agile UI</VisuallyHidden>
              <Github className={'h-5 w-5'} />
            </a>
          </Tooltip>
        </div>
      </div>
    </header>
  );
};
