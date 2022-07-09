import { cx } from 'twind';
import { useLayerState } from './Layout';
import { LayoutNavMenu } from './LayoutNavMenu';

export const LayoutAside = () => {
  const layer = useLayerState();

  return (
    <aside
      role={layer ? 'dialog' : undefined}
      className={cx(
        layer ? 'w-full translate-x-0' : 'translate-x-[-100%]',
        'tablet:(translate-x-0 w-52) transition-transform duration-300',
        'fixed bottom-0 top-16 z-30 border-r border-r-gray-100',
        'overscroll-contain overflow-y-auto overflow-x-hidden',
        '&::-webkit-scrollbar:(w-[9px] h-[9px]) &::-webkit-scrollbar-thumb:(border-([3px] solid transparent) bg-clip-padding bg-gray-200 rounded-[5px])'
      )}
    >
      <LayoutNavMenu />
    </aside>
  );
};
