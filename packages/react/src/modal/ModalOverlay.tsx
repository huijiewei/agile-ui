import { FloatingOverlay } from '@floating-ui/react';
import { cx } from '@twind/core';
import { primitiveComponent } from '../utils/component';
import { useModal } from './ModalProvider';
import { Motion } from '../motion/Motion';

export const ModalOverlay = primitiveComponent<'div'>((props, ref) => {
  const { className, ...rest } = props;
  const { lockScroll } = useModal();

  return (
    <Motion
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.75 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      as={FloatingOverlay}
      lockScroll={lockScroll}
      ref={ref}
      className={cx('z-30 bg-black dark:bg-black', className)}
      {...rest}
    />
  );
});

ModalOverlay.displayName = 'ModalOverlay';
