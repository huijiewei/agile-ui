import { cx } from '@twind/core';
import { useLayoutAsideCollapsed } from './LayoutProvider';
import { LayoutAsideMenu } from './LayoutAsideMenu';

export const LayoutAside = () => {
  const collapsed = useLayoutAsideCollapsed();

  return (
    <aside
      role={collapsed ? 'dialog' : undefined}
      className={cx(
        collapsed ? 'w-full translate-x-0' : 'tablet:(translate-x-0 w-64) -translate-x-full',
        'transition-transform duration-300',
        'fixed top-16 bottom-0 z-30 border-r border-r-gray-100 bg-white tablet:z-0',
        'scrollbar-thin overflow-y-auto overflow-x-hidden overscroll-contain'
      )}
    >
      <LayoutAsideMenu />
    </aside>
  );
};
