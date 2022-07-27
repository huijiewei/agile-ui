import { useMergedRefs } from '@agile-ui/react-hooks';
import { __DEV__ } from '@agile-ui/utils';
import { FloatingFocusManager } from '@floating-ui/react-dom-interactions';
import { cx } from 'twind';
import { Portal } from '../portal/Portal';
import { primitiveComponent } from '../utils/component';
import { usePopoverAria, usePopoverFloating } from './PopoverProvider';
import { AnimatePresence } from 'framer-motion';
import { Motion } from '../motion/Motion';

export const PopoverContent = primitiveComponent<'div'>((props, ref) => {
  const { children, className, ...rest } = props;

  const { open, x, y, floating, context, getFloatingProps, modal, initialFocus } = usePopoverFloating();

  const { labelId, descriptionId } = usePopoverAria();

  const refs = useMergedRefs(floating, ref);

  return (
    <Portal>
      <AnimatePresence>
        {open && (
          <FloatingFocusManager modal={modal} initialFocus={initialFocus} context={context}>
            <Motion
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
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
                className={cx('relative shadow rounded border border-gray-200 bg-white dark:bg-gray-700', className)}
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

if (__DEV__) {
  PopoverContent.displayName = 'PopoverContent';
}
