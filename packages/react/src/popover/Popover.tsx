import { __DEV__, runIfFn } from '@agile-ui/utils';
import {
  autoPlacement,
  autoUpdate,
  flip,
  offset,
  Placement,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from '@floating-ui/react-dom-interactions';
import type { PropsWithChildren, ReactNode } from 'react';
import { MutableRefObject, useCallback, useId, useMemo, useState } from 'react';
import type { AnimationBaseProps } from '../animation/Animation';
import { PopoverProvider } from './PopoverProvider';

export type PopoverProps = {
  /**
   * 放置位置
   * @default 'auto'
   */
  placement?: 'auto' | Placement;

  /**
   * 动画
   * @default 'hover'
   */
  animation?: AnimationBaseProps;

  /**
   * 默认开启状态
   */
  opened?: boolean;

  /**
   * 关闭时的回调
   */
  onClose?: () => void;

  /**
   * 开启后焦点目标
   */
  initialFocus?: number | MutableRefObject<HTMLElement | null>;

  /**
   * 是否 modal
   * @default true
   */
  modal?: boolean;

  /**
   * 按下 Esc 键时, 弹出框将关闭
   * @default true
   */
  closeOnEsc?: boolean;

  /**
   * 单击外部时, 弹出框将关闭
   * @default true
   */
  closeOnBlur?: boolean;

  children?: ReactNode | ((props: { opened: boolean; handleClose?: () => void }) => ReactNode);
};

export const Popover = (props: PropsWithChildren<PopoverProps>) => {
  const {
    children,
    placement,
    animation,
    closeOnEsc = true,
    closeOnBlur = true,
    modal = true,
    opened = false,
    onClose,
    initialFocus,
  } = props;

  const [open, setOpen] = useState(opened);

  const { x, y, reference, floating, context } = useFloating<HTMLElement>({
    middleware: [offset(8), placement == 'auto' ? autoPlacement() : flip(), shift({ padding: 8 })],
    open,
    onOpenChange: (opened) => {
      setOpen(opened);

      if (!opened) {
        onClose && onClose();
      }
    },
    placement: placement == 'auto' ? undefined : placement,
    whileElementsMounted: autoUpdate,
  });

  const id = useId();
  const labelId = `${id}-label`;
  const descriptionId = `${id}-description`;

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context),
    useRole(context),
    useDismiss(context, { escapeKey: closeOnEsc, outsidePointerDown: closeOnBlur }),
  ]);

  const handleClose = useCallback(() => {
    setOpen(false);

    onClose && onClose();
  }, [onClose]);

  const value = useMemo(
    () => ({
      open,
      x,
      y,
      context,
      reference,
      floating,
      getReferenceProps,
      getFloatingProps,
      animation,
      labelId,
      descriptionId,
      onClose: handleClose,
      modal,
      initialFocus,
    }),
    [
      open,
      x,
      y,
      context,
      reference,
      floating,
      getReferenceProps,
      getFloatingProps,
      animation,
      labelId,
      descriptionId,
      handleClose,
      modal,
      initialFocus,
    ]
  );

  return <PopoverProvider value={value}>{runIfFn(children, { opened: open, handleClose })}</PopoverProvider>;
};

if (__DEV__) {
  Popover.displayName = 'Popover';
}
