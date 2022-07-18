import { __DEV__ } from '@agile-ui/utils';
import { useClick, useDismiss, useFloating, useInteractions, useRole } from '@floating-ui/react-dom-interactions';
import type { PropsWithChildren } from 'react';
import { useCallback, useId, useMemo } from 'react';
import type { AnimationBaseProps } from '../animation/Animation';
import { Portal } from '../portal/Portal';
import { ModalProvider } from './ModalProvider';

export type ModalProps = {
  /**
   * 开启状态
   */
  opened: boolean;

  /**
   * 关闭时的回调
   */
  onClose: () => void;

  /**
   * 按下 Esc 键时, 模态框将关闭
   * @default true
   */
  closeOnEsc?: boolean;

  /**
   * 单击外部时, 模态框将关闭
   * @default true
   */
  closeOnBlur?: boolean;

  /**
   * 模态框开启后锁定滚动条
   *
   * @default true
   */
  lockScroll?: boolean;

  /**
   * 动画
   * @default 'hover'
   */
  animation?: AnimationBaseProps;
};

export const Modal = (props: PropsWithChildren<ModalProps>) => {
  const { children, animation = {}, closeOnEsc = true, closeOnBlur = true, opened, onClose, lockScroll = true } = props;

  const { floating, context } = useFloating<HTMLElement>({
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
    useDismiss(context, { escapeKey: closeOnEsc, outsidePointerDown: closeOnBlur }),
  ]);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const value = useMemo(
    () => ({
      open: opened,
      context,
      floating,
      getFloatingProps,
      animation,
      lockScroll,
      labelId,
      descriptionId,
      onClose: handleClose,
    }),
    [opened, context, floating, getFloatingProps, animation, lockScroll, labelId, descriptionId, handleClose]
  );

  return (
    <ModalProvider value={value}>
      <Portal>{children}</Portal>
    </ModalProvider>
  );
};

if (__DEV__) {
  Modal.displayName = 'Modal';
}
