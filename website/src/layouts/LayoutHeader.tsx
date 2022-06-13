import { Tooltip, VisuallyHidden } from '@agile-ui/react';
import { Github } from '@agile-ui/react-icons';
import { tw } from 'twind';
import LogoImage from '../assets/images/logo.svg';
import { ThemeSwitcher } from '../components/theme-switcher/ThemeSwicher';

export const LayoutHeader = () => {
  return (
    <header
      className={tw('sticky top-0 z-30 w-full border-b border-slate-200 bg-opacity-90 py-3 backdrop-blur laptop:z-50')}
    >
      <div className={tw('mx-auto flex max-w-7xl items-center justify-between px-5')}>
        <div className={'flex flex-row items-center'}>
          <img
            width={'36'}
            height={'36'}
            className={'inline-block align-middle mt-[1px] -mb-[1px]'}
            alt={'Agile UI'}
            src={LogoImage}
          />
          <span className={'ml-1.5 inline-block align-middle text-[22px] font-bold'}>Agile UI</span>
          <span
            className={tw(
              'ml-3 inline-block rounded-sm bg-slate-100 px-1.5 py-0.5 align-middle text-xs font-bold text-orange-700'
            )}
          >
            ALPHA
          </span>
        </div>
        <div className={'flex flex-row items-center gap-2'}>
          <ThemeSwitcher />
          <Tooltip placement={'bottom'} content={'Github 上的 Agile UI'}>
            <a
              className={'block border-slate-300 rounded p-1 border text-slate-500 select-none hover:text-slate-700'}
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
