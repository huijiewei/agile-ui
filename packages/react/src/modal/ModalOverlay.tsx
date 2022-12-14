import { FloatingOverlay } from '@floating-ui/react';
import { cx } from '@twind/core';
import { primitiveComponent } from '../utils/component';
import { useModal } from './ModalProvider';
import { getMotionProps, Motion, MotionComponentProps } from '../motion/Motion';

export const ModalOverlay = primitiveComponent<'div', MotionComponentProps>((props, ref) => {
  const { className, motionPreset = 'fade', motionProps, ...rest } = props;

  const { lockScroll } = useModal();

  return (
    <Motion
      {...getMotionProps(motionPreset, motionProps)}
      as={FloatingOverlay}
      lockScroll={lockScroll}
      ref={ref}
      className={cx('z-30 bg-black/60 dark:bg-black/60', className)}
      {...rest}
    />
  );
});

ModalOverlay.displayName = 'ModalOverlay';
