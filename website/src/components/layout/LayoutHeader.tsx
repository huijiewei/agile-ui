import { Tooltip, VisuallyHidden } from '@agile-ui/react';
import { Close, Github, Menu } from '@agile-ui/react-icons';
import { Link } from 'react-router-dom';
import { cx } from '@twind/core';
import LogoImage from '../../assets/images/logo.svg';
import { ThemeSwitcher } from '../shared/ThemeSwicher';
import { useLayoutAsideCollapsed, useLayoutAsideCollapsedDispatch, useLayoutAsideExisted } from './LayoutProvider';

const AsideCollapsedButton = () => {
  const existed = useLayoutAsideExisted();
  const collapsed = useLayoutAsideCollapsed();
  const dispatch = useLayoutAsideCollapsedDispatch();

  return (
    <button
      onClick={() => dispatch((prev) => !prev)}
      className={cx(
        'block select-none appearance-none p-2 text-gray-500 transition-colors hover:text-gray-700 tablet:hidden',
        existed ? 'visible' : 'invisible'
      )}
      type={'button'}
    >
      {collapsed ? <Close size={5} /> : <Menu size={5} />}
    </button>
  );
};

export const LayoutHeader = () => {
  return (
    <header className={'sticky top-0 z-30 w-full border-b border-gray-100 bg-opacity-70 backdrop-blur'}>
      <div className={'mx-auto flex items-center justify-between p-3'}>
        <AsideCollapsedButton />
        <div className={'flex flex-row items-center'}>
          <Link to={'/'}>
            <img
              width={32}
              height={32}
              className={'mt-[1px] -mb-[1px] inline-block align-middle'}
              alt={'Agile UI'}
              src={LogoImage}
            />
            <span className={'ml-1.5 inline-block align-middle text-[1.5rem] font-bold'}>Agile UI</span>
          </Link>
          <span
            className={
              'ml-3 hidden rounded-sm bg-gray-100 px-1.5 py-0.5 align-middle text-xs font-bold text-yellow-600 tablet:inline-block'
            }
          >
            ALPHA
          </span>
        </div>
        <div className={'flex flex-row items-center gap-2'}>
          <ThemeSwitcher />
          <Tooltip placement={'bottom'} content={'Github 上的 Agile UI'}>
            <a
              className={'block select-none p-1 text-gray-400 hover:text-gray-500'}
              rel="noreferrer"
              href="https://github.com/huijiewei/agile-ui"
              target="_blank"
            >
              <VisuallyHidden>Github 上的 Agile UI</VisuallyHidden>
              <Github size={5} />
            </a>
          </Tooltip>
        </div>
      </div>
    </header>
  );
};
