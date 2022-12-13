import type { PropsWithChildren } from 'react';
import { DrawerProvider } from './DrawerProvider';
import { Modal, ModalProps } from '../modal/Modal';

export type DrawerProps = Omit<ModalProps, 'scrollBehavior'> & {
  /**
   * 抽屉放置位置
   * @default 'right'
   */
  placement?: 'left' | 'right' | 'bottom' | 'top';
};

export const Drawer = (props: PropsWithChildren<DrawerProps>) => {
  const { placement = 'right', children, ...rest } = props;

  return (
    <DrawerProvider value={{ placement }}>
      <Modal {...rest}>{children}</Modal>
    </DrawerProvider>
  );
};

Drawer.displayName = 'Drawer';

export { ModalBody as DrawerBody } from '../modal/ModalBody';
export { ModalCloseButton as DrawerCloseButton } from '../modal/ModalCloseButton';
export { ModalFooter as DrawerFooter } from '../modal/ModalFooter';
export { ModalHeader as DrawerHeader } from '../modal/ModalHeader';
export { ModalOverlay as DrawerOverlay } from '../modal/ModalOverlay';
