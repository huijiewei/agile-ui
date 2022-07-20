import { cx } from 'twind';
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
        'fixed top-16 bottom-0 z-10 tablet:z-0 border-r border-r-gray-100 bg-white',
        'overscroll-contain overflow-y-auto overflow-x-hidden',
        '&::-webkit-scrollbar:(w-[9px] h-[9px]) &::-webkit-scrollbar-thumb:(border-([3px] solid transparent) bg-clip-padding bg-gray-200 rounded-[5px])'
      )}
    >
      <LayoutAsideMenu />
    </aside>
  );
};
