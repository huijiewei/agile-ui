import { useMergedRefs } from '@agile-ui/react-hooks';
import { FloatingFocusManager } from '@floating-ui/react';
import { cx } from '@twind/core';
import { Portal } from '../portal/Portal';
import { primitiveComponent } from '../utils/component';
import { usePopoverAria, usePopoverFloating } from './PopoverProvider';
import { AnimatePresence } from 'framer-motion';
import { getMotionProps, Motion } from '../motion/Motion';

export const PopoverContent = primitiveComponent<'div'>((props, ref) => {
  const { children, className, ...rest } = props;

  const { open, x, y, setFloating, context, getFloatingProps, modal, initialFocus, motionPreset, motionProps } =
    usePopoverFloating();

  const { labelId, descriptionId } = usePopoverAria();

  const refs = useMergedRefs(setFloating, ref);

  return (
    <Portal>
      <AnimatePresence>
        {open && (
          <FloatingFocusManager modal={modal} initialFocus={initialFocus} context={context}>
            <Motion
              {...getMotionProps(motionPreset, motionProps)}
              className={'absolute z-10 outline-none'}
              {...getFloatingProps({
                ...rest,
                ref: refs,
                'aria-labelledby': labelId,
                'aria-describedby': descriptionId,
                style: {
                  top: y ? `${y}px` : '',
                  left: x ? `${x}px` : '',
                },
              })}
            >
              <div
                className={cx('relative rounded border border-gray-200 bg-white shadow dark:bg-gray-700', className)}
              >
                {children}
              </div>
            </Motion>
          </FloatingFocusManager>
        )}
      </AnimatePresence>
    </Portal>
  );
});

PopoverContent.displayName = 'PopoverContent';
