import { mergeRefs } from '@agile-ui/react-hooks';
import { FloatingFocusManager } from '@floating-ui/react';
import { cx } from '@twind/core';
import { primitiveComponent } from '../utils/component';
import { useModal } from '../modal/ModalProvider';
import { getMotionProps, Motion } from '../motion/Motion';
import { useEffect } from 'react';
import { useDrawer } from './DrawerProvider';

const placementStyles = {
  left: 'left-0 top-0 bottom-0',
  right: 'right-0 top-0 bottom-0',
  top: 'top-0 left-0 right-0',
  bottom: 'bottom-0 left-0 right-0',
};

export const DrawerContent = primitiveComponent<'div'>((props, ref) => {
  const { children, className, ...rest } = props;
  const { placement } = useDrawer();
  const {
    open,
    setFloating,
    context,
    getFloatingProps,
    labelId,
    descriptionId,
    initialFocus,
    finalFocus,
    motionPreset,
    motionProps,
  } = useModal();

  useEffect(() => {
    if (!open) {
      finalFocus && finalFocus.current?.focus();
    }
  }, [open, finalFocus]);

  return (
    <div className={cx('fixed flex left-0 top-0 w-screen h-screen z-40 justify-center')}>
      <FloatingFocusManager initialFocus={initialFocus} returnFocus={finalFocus == undefined} context={context}>
        <Motion
          {...getMotionProps(motionPreset, motionProps)}
          className={cx('flex flex-col fixed bg-white shadow dark:bg-gray-700', placementStyles[placement], className)}
          {...getFloatingProps({
            ...rest,
            ref: mergeRefs(setFloating, ref),
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
