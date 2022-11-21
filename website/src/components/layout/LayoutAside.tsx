import { cx } from '@twind/core';
import { useLayoutAsideCollapsed } from './LayoutProvider';
import { LayoutAsideMenu } from './LayoutAsideMenu';

export const LayoutAside = () => {
  const collapsed = useLayoutAsideCollapsed();

  return (
    <aside
      role={collapsed ? 'dialog' : undefined}
      className={cx(
        collapsed ? 'w-full translate-x-0' : '-translate-x-full tablet:(translate-x-0 w-52)',
        'transition-transform duration-300',
        'fixed top-16 bottom-0 z-30 tablet:z-0 border-r border-r-gray-100 bg-white',
        'overscroll-contain overflow-y-auto overflow-x-hidden scrollbar-thin'
      )}
    >
      <LayoutAsideMenu />
    </aside>
  );
};
