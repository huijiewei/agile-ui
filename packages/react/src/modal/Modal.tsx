import { useClick, useDismiss, useFloating, useInteractions, useRole } from '@floating-ui/react';
import type { PropsWithChildren, RefObject } from 'react';
import { useCallback, useId, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Portal } from '../portal/Portal';
import { ModalProvider } from './ModalProvider';
import type { MotionComponentProps } from '../motion/Motion';

export type ModalProps = {
  /**
   * 控制打开状态
   */
  opened: boolean;

  /**
   * 关闭时的回调
   */
  onClose: () => void;

  /**
   * 关闭完成后的回调
   */
  onCloseComplete: () => void;

  /**
   * 按下 Esc 键时, 将关闭
   * @default true
   */
  closeOnEsc?: boolean;

  /**
   * 单击外部时, 将关闭
   * @default true
   */
  closeOnBlur?: boolean;

  /**
   * 开启后锁定滚动条
   * @default true
   */
  lockScroll?: boolean;

  /**
   * 开启后焦点目标
   */
  initialFocus?: number | RefObject<HTMLElement>;

  /**
   * 关闭后焦点目标
   */
  finalFocus?: RefObject<HTMLElement>;

  /**
   * 滚动行为
   * @default 'inside'
   */
  scrollBehavior?: 'inside' | 'outside';
} & MotionComponentProps;

export const Modal = (props: PropsWithChildren<ModalProps>) => {
  const {
    children,
    closeOnEsc = true,
    closeOnBlur = true,
    opened,
    onClose,
    onCloseComplete,
    lockScroll = true,
    initialFocus,
    finalFocus,
    scrollBehavior = 'inside',
    motionPreset = 'fade',
    motionProps,
  } = props;

  const { refs, context } = useFloating<HTMLElement>({
    open: opened,
    onOpenChange: (opened) => {
      if (!opened) {
        onClose();
      }
    },
  });

  const id = useId();
  const labelId = `${id}-label`;
  const descriptionId = `${id}-description`;

  const { getFloatingProps } = useInteractions([
    useClick(context),
    useRole(context),
    useDismiss(context, { escapeKey: closeOnEsc, outsidePress: closeOnBlur }),
  ]);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const value = useMemo(
    () => ({
      open: opened,
      context,
      setFloating: refs.setFloating,
      getFloatingProps,
      initialFocus,
      finalFocus,
      scrollBehavior,
      lockScroll,
      labelId,
      descriptionId,
      onClose: handleClose,
      motionPreset,
      motionProps,
    }),
    [
      opened,
      context,
      refs.setFloating,
      getFloatingProps,
      initialFocus,
      finalFocus,
      scrollBehavior,
      lockScroll,
      labelId,
      descriptionId,
      handleClose,
      motionPreset,
      motionProps,
    ]
  );

  return (
    <ModalProvider value={value}>
      <AnimatePresence onExitComplete={onCloseComplete}>{value.open && <Portal>{children}</Portal>}</AnimatePresence>
    </ModalProvider>
  );
};

Modal.displayName = 'Modal';
