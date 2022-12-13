import { mergeRefs } from '@agile-ui/react-hooks';
import { FloatingFocusManager } from '@floating-ui/react';
import { cx } from '@twind/core';
import { primitiveComponent } from '../utils/component';
import { useModal } from '../modal/ModalProvider';
import { Motion } from '../motion/Motion';
import { useEffect } from 'react';
import { useDrawer } from './DrawerProvider';

const placementStyles = {
  left: {
    position: 'left-0 top-0 bottom-0',
    exit: { x: '-100%', y: 0 },
  },
  right: {
    position: 'right-0 top-0 bottom-0',
    exit: { x: '100%', y: 0 },
  },
  top: {
    position: 'top-0 left-0 right-0',
    exit: { x: 0, y: '-100%' },
  },
  bottom: {
    position: 'bottom-0 left-0 right-0',
    exit: { x: 0, y: '100%' },
  },
};

export const DrawerContent = primitiveComponent<'div'>((props, ref) => {
  const { children, className, ...rest } = props;
  const { placement } = useDrawer();
  const { open, floating, context, getFloatingProps, labelId, descriptionId, initialFocus, finalFocus } = useModal();

  useEffect(() => {
    if (!open) {
      finalFocus && finalFocus.current?.focus();
    }
  }, [open, finalFocus]);

  return (
    <div className={cx('fixed flex left-0 top-0 w-screen h-screen z-40 justify-center')}>
      <FloatingFocusManager initialFocus={initialFocus} returnFocus={finalFocus == undefined} context={context}>
        <Motion
          initial={placementStyles[placement].exit}
          animate={{ x: 0, y: 0 }}
          exit={placementStyles[placement].exit}
          transition={{ duration: 0.3 }}
          className={cx(
            'flex flex-col fixed bg-white shadow dark:bg-gray-700',
            placementStyles[placement].position,
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
  );
});

DrawerContent.displayName = 'DrawerContent';
