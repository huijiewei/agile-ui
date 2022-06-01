import { Tooltip, VisuallyHidden } from '@agile-ui/react';
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
            width={'32'}
            height={'32'}
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
          <Tooltip content={'Github 上的 Agile UI'}>
            <a
              className={'block border-slate-300 rounded p-1 border text-slate-500 hover:text-slate-700'}
              rel="noreferrer"
              href="https://github.com/huijiewei/agile-ui"
              target="_blank"
            >
              <VisuallyHidden>Github 上的 Agile UI</VisuallyHidden>
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className={'h-5 w-5'} viewBox="0 0 24 24">
                <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
              </svg>
            </a>
          </Tooltip>
        </div>
      </div>
    </header>
  );
};
