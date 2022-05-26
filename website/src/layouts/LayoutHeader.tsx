import { Tooltip, VisuallyHidden } from '@agile-ui/react';
import { tw } from 'twind';
import LogoImage from '../assets/images/logo.png';

export const LayoutHeader = () => {
  return (
    <header
      className={tw(
        'sticky top-0 z-30 w-full border-b border-slate-200 bg-white bg-opacity-90 py-3 backdrop-blur laptop:z-50'
      )}
    >
      <div className={tw('mx-auto flex max-w-7xl items-center justify-between px-5')}>
        <div className={'flex flex-row items-center'}>
          <img
            width={'36'}
            height={'36'}
            className={'inline-block w-9 align-middle'}
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
        <div className={'flex flex-row items-center'}>
          <Tooltip placement={'bottom'} content={'Github 上的 Agile UI'}>
            <a
              className={'block text-slate-500 hover:text-slate-700'}
              rel="noreferrer"
              href="https://github.com/huijiewei/agile-ui"
              target="_blank"
            >
              <VisuallyHidden>Github 上的 Agile UI</VisuallyHidden>
              <svg viewBox="0 0 16 16" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
              </svg>
            </a>
          </Tooltip>
        </div>
      </div>
    </header>
  );
};
