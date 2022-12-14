import { useMergedRefs } from '@agile-ui/react-hooks';
import { FloatingFocusManager, FloatingNode } from '@floating-ui/react';
import { Children, isValidElement } from 'react';
import { cx } from '@twind/core';
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
import { AnimatePresence } from 'framer-motion';
import { getMotionProps, Motion } from '../motion/Motion';

export const DropdownMenuContent = primitiveComponent<'div'>((props, ref) => {
  const { children, className, ...rest } = props;

  const {
    open,
    x,
    y,
    context,
    floating,
    getFloatingProps,
    nested,
    nodeId,
    tree,
    allowHover,
    getItemProps,
    listItemsRef,
    setActiveIndex,
    motionPreset,
    motionProps,
  } = useDropdownMenuFloating();

  const refs = useMergedRefs(floating, ref);

  let itemIndex = 0;

  return (
    <FloatingNode id={nodeId}>
      <Portal>
        <AnimatePresence>
          {open && (
            <FloatingFocusManager
              modal={!nested}
              order={['reference', 'content']}
              returnFocus={!nested}
              context={context}
            >
              <Motion
                {...getMotionProps(motionPreset, motionProps)}
                className={cx(
                  'absolute outline-none',
                  'rounded border border-gray-200 bg-white p-1.5 shadow dark:bg-gray-700',
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
                        const { children: groupChildren, ...groupRest } = child.props;

                        return (
                          <DropdownMenuGroup {...groupRest}>
                            {Children.map(groupChildren, (groupChild) => {
                              return (
                                <DropdownMenuItemIndexProvider value={itemIndex++}>
                                  {groupChild}
                                </DropdownMenuItemIndexProvider>
                              );
                            })}
                          </DropdownMenuGroup>
                        );
                      }

                      if (child.type == DropdownMenuItem || child.type == DropdownMenu) {
                        return (
                          <DropdownMenuItemIndexProvider value={itemIndex++}>{child}</DropdownMenuItemIndexProvider>
                        );
                      }
                    }

                    return child;
                  })}
                </DropdownMenuContentProvider>
              </Motion>
            </FloatingFocusManager>
          )}
        </AnimatePresence>
      </Portal>
    </FloatingNode>
  );
});

DropdownMenuContent.displayName = 'DropdownMenuContent';
