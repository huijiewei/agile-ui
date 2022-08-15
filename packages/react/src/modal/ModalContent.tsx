import { mergeRefs } from '@agile-ui/react-hooks';
import { __DEV__ } from '@agile-ui/utils';
import { FloatingFocusManager } from '@floating-ui/react-dom-interactions';
import { cx } from 'twind';
import { primitiveComponent } from '../utils/component';
import { useModal } from './ModalProvider';
import { AnimatePresence } from 'framer-motion';
import { Motion } from '../motion/Motion';
import { useEffect } from 'react';

export const ModalContent = primitiveComponent<'div'>((props, ref) => {
  const { children, className, ...rest } = props;
  const {
    open,
    floating,
    context,
    getFloatingProps,
    labelId,
    descriptionId,
    initialFocus,
    finalFocus,
    scrollBehavior,
  } = useModal();

  useEffect(() => {
    if (!open) {
      finalFocus && finalFocus.current?.focus();
    }
  }, [open, finalFocus]);

  return (
    <AnimatePresence>
      {open && (
        <div
          className={cx(
            'flex fixed w-screen left-0 top-0 z-40 justify-center',
            scrollBehavior == 'inside' ? 'h-screen items-center' : 'overflow-y-auto h-full items-start'
          )}
        >
          <FloatingFocusManager initialFocus={initialFocus} returnFocus={finalFocus == undefined} context={context}>
            <Motion
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={cx(
                'relative flex flex-col shadow rounded border border-gray-200 bg-white dark:bg-gray-700',
                scrollBehavior == 'inside' ? 'max-h-[calc(100%-9rem)] ' : 'my-10',
                className
              )}
              {...getFloatingProps({
                ...rest,
                ref: mergeRefs(floating, ref),
                'aria-labelledby': labelId,
                'aria-describedby': descriptionId,
              })}
            >
              {children}
            </Motion>
          </FloatingFocusManager>
        </div>
      )}
    </AnimatePresence>
  );
});

if (__DEV__) {
  ModalContent.displayName = 'ModalContent';
}
