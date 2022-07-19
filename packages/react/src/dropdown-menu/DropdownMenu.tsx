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
import { useCallback, useId, useMemo, useState } from 'react';
import type { AnimationBaseProps } from '../animation/Animation';
import { DropdownMenuProvider } from './DropdownMenuProvider';

export type DropdownMenuProps = {
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
   * 按下 Esc 键时, 弹出菜单将关闭
   * @default true
   */
  closeOnEsc?: boolean;

  /**
   * 单击外部时, 弹出菜单将关闭
   * @default true
   */
  closeOnBlur?: boolean;

  /**
   * 选择项目后, 弹出菜单将关闭
   * @default true
   */
  closeOnSelect?: boolean;

  /**
   * @ignore
   */
  children?: ReactNode | ((props: { opened: boolean; handleClose?: () => void }) => ReactNode);
};

export const DropdownMenu = (props: PropsWithChildren<DropdownMenuProps>) => {
  const { children, placement, animation, closeOnEsc = true, closeOnBlur = true, opened = false, onClose } = props;

  const [open, setOpen] = useState(opened);

  const {
    x,
    y,
    reference,
    floating,
    context,
    placement: placementState,
  } = useFloating<HTMLElement>({
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
    useRole(context, { role: 'menu' }),
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
      placement: placementState,
      animation,
      labelId,
      descriptionId,
      onClose: handleClose,
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
      placementState,
      animation,
      labelId,
      descriptionId,
      handleClose,
    ]
  );

  return <DropdownMenuProvider value={value}>{runIfFn(children, { opened: open, handleClose })}</DropdownMenuProvider>;
};

if (__DEV__) {
  DropdownMenu.displayName = 'DropdownMenu';
}
