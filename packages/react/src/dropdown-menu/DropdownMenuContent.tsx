import { useAnimation, useMergedRefs } from '@agile-ui/react-hooks';
import { __DEV__ } from '@agile-ui/utils';
import { FloatingFocusManager, FloatingNode } from '@floating-ui/react-dom-interactions';
import { Children, isValidElement } from 'react';
import { cx } from 'twind';
import { Portal } from '../portal/Portal';
import { primitiveComponent } from '../utils/component';
import { DropdownMenu } from './DropdownMenu';
import { DropdownMenuGroup } from './DropdownMenuGroup';
import { DropdownMenuItem } from './DropdownMenuItem';
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
    nodeId,
    tree,
    allowHover,
    getItemProps,
    listItemsRef,
    setActiveIndex,
  } = useDropdownMenuFloating();

  const { duration, enter, exit, transition } = animation;

  const refs = useMergedRefs(floating, ref);

  const { stage, shouldMount } = useAnimation(open, duration);

  let itemIndex = 0;

  return (
    <FloatingNode id={nodeId}>
      <Portal>
        {shouldMount && (
          <FloatingFocusManager modal={!nested} order={['reference', 'content']} preventTabbing context={context}>
            <div
              className={cx(
                'absolute outline-none',
                'p-1.5 min-w-[10em] rounded shadow border border-gray-200 bg-white dark:bg-gray-700',
                `duration-[${duration}ms] ${transition}`,
                stage == 'enter' ? enter : exit,
                className
              )}
              {...getFloatingProps({
                ...rest,
                ref: refs,
                style: {
                  top: y ? `${y}px` : '',
                  left: x ? `${x}px` : '',
                },
              })}
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
                {Children.map(children, (child) => {
                  if (isValidElement(child)) {
                    if (child.type == DropdownMenuGroup) {
                      return Children.map(child.props.children, (groupChild) => {
                        return (
                          <DropdownMenuItemIndexProvider value={itemIndex++}>
                            {groupChild}
                          </DropdownMenuItemIndexProvider>
                        );
                      });
                    }

                    if (child.type == DropdownMenuItem || child.type == DropdownMenu) {
                      return <DropdownMenuItemIndexProvider value={itemIndex++}>{child}</DropdownMenuItemIndexProvider>;
                    }
                  }

                  return child;
                })}
              </DropdownMenuContentProvider>
            </div>
          </FloatingFocusManager>
        )}
      </Portal>
    </FloatingNode>
  );
});

if (__DEV__) {
  DropdownMenuContent.displayName = 'DropdownMenuContent';
}
