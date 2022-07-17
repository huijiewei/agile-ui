import { __DEV__ } from '@agile-ui/utils';
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
import type { PropsWithChildren } from 'react';
import { useId, useMemo, useState } from 'react';
import type { AnimationBaseProps } from '../animation/Animation';
import { PopoverProvider } from './PopoverProvider';

export type PopoverProps = {
  /**
   * 受控开启状态
   */
  opened?: boolean;

  /**
   * 默认开启状态
   */
  defaultOpened?: boolean;

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
   * 开启状态改变时的回调
   */
  onChange?: (opened: boolean) => void;

  /**
   * 是否 modal
   * @default true
   */
  modal?: boolean;

  /**
   * 按下 Esc 键时, 气泡卡片将关闭
   * @default true
   */
  closeOnEsc?: boolean;

  /**
   * 单击外部时, 气泡卡片将关闭
   * @default true
   */
  closeOnBlur?: boolean;
};

export const Popover = (props: PropsWithChildren<PopoverProps>) => {
  const { children, placement, animation, closeOnEsc = true, closeOnBlur = true, modal = true } = props;

  const [open, setOpen] = useState(false);

  const { x, y, reference, floating, context } = useFloating<HTMLElement>({
    middleware: [offset(8), placement == 'auto' ? autoPlacement() : flip(), shift({ padding: 8 })],
    open,
    onOpenChange: setOpen,
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
      onClose: () => setOpen(false),
      modal,
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
      modal,
    ]
  );

  return <PopoverProvider value={value}>{children}</PopoverProvider>;
};

if (__DEV__) {
  Popover.displayName = 'Popover';
}
