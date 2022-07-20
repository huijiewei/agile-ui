import { useAnimation, useMergedRefs } from '@agile-ui/react-hooks';
import { __DEV__ } from '@agile-ui/utils';
import { FloatingFocusManager } from '@floating-ui/react-dom-interactions';
import { Children } from 'react';
import { cx } from 'twind';
import { Portal } from '../portal/Portal';
import { primitiveComponent } from '../utils/component';
import {
  DropdownMenuContentProvider,
  DropdownMenuItemIndexProvider,
  useDropdownMenuFloating,
} from './DropdownMenuProvider';

export const DropdownMenuContent = primitiveComponent<'div'>((props, ref) => {
  const { children, className, ...rest } = props;

  const {
    open,
    x,
    y,
    context,
    floating,
    getFloatingProps,
    animation,
    nested,
    tree,
    allowHover,
    getItemProps,
    listItemsRef,
    setActiveIndex,
  } = useDropdownMenuFloating();

  const { duration, enter, exit, transition } = animation;

  const refs = useMergedRefs(floating, ref);

  const { stage, shouldMount } = useAnimation(open, duration);

  return (
    <Portal>
      {shouldMount && (
        <FloatingFocusManager order={['reference', 'content']} modal={!nested} preventTabbing context={context}>
          <div
            className={cx(
              'absolute z-10 focus-visible:outline-none',
              `duration-[${duration}ms] ${transition}`,
              stage == 'enter' ? enter : exit
            )}
            {...getFloatingProps({
              ref: refs,
              style: {
                top: y ? `${y}px` : '',
                left: x ? `${x}px` : '',
              },
              ...rest,
            })}
          >
            <div
              className={cx(
                'relative p-1.5 min-w-[10em] rounded shadow border border-gray-200 bg-white dark:bg-gray-700',
                className
              )}
            >
              <DropdownMenuContentProvider
                value={{
                  tree,
                  allowHover,
                  getItemProps,
                  listItemsRef,
                  setActiveIndex,
                }}
              >
                {Children.map(children, (child, index) => {
                  return <DropdownMenuItemIndexProvider value={index}>{child}</DropdownMenuItemIndexProvider>;
                })}{' '}
              </DropdownMenuContentProvider>
            </div>
          </div>
        </FloatingFocusManager>
      )}
    </Portal>
  );
});

if (__DEV__) {
  DropdownMenuContent.displayName = 'DropdownMenuContent';
}
