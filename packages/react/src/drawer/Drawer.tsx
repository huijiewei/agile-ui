import type { PropsWithChildren } from 'react';
import { DrawerProvider } from './DrawerProvider';
import { Modal, ModalProps } from '../modal/Modal';
import type { MotionPreset } from '../motion/Motion';

export type DrawerProps = Omit<ModalProps, 'scrollBehavior' | 'motionPreset'> & {
  /**
   * 抽屉放置位置
   * @default 'right'
   */
  placement?: 'left' | 'right' | 'bottom' | 'top';

  /**
   * 动画效果
   * @default 根据 placement 变化
   */
  motionPreset?: MotionPreset;
};

const drawerMotionPresets = {
  top: 'slideDown',
  bottom: 'slideUp',
  left: 'slideRight',
  right: 'slideLeft',
};

export const Drawer = (props: PropsWithChildren<DrawerProps>) => {
  const { placement = 'right', children, motionPreset, ...rest } = props;

  const drawerMotionPreset = (drawerMotionPresets[placement] || motionPreset) as MotionPreset;

  return (
    <DrawerProvider value={{ placement }}>
      <Modal motionPreset={drawerMotionPreset} {...rest}>
        {children}
      </Modal>
    </DrawerProvider>
  );
};

Drawer.displayName = 'Drawer';

export { ModalBody as DrawerBody } from '../modal/ModalBody';
export { ModalCloseButton as DrawerCloseButton } from '../modal/ModalCloseButton';
export { ModalFooter as DrawerFooter } from '../modal/ModalFooter';
export { ModalHeader as DrawerHeader } from '../modal/ModalHeader';
export { ModalOverlay as DrawerOverlay } from '../modal/ModalOverlay';
