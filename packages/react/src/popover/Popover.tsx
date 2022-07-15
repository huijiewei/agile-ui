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
import { useId, useMemo, useState } from 'react';
import type { PropsWithChildren } from 'react';
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
   */
  modal?: boolean;
};

export const Popover = (props: PropsWithChildren<PopoverProps>) => {
  const { children, placement, animation } = props;

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
    useDismiss(context),
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
    }),
    [open, x, y, context, reference, floating, getReferenceProps, getFloatingProps, animation, labelId, descriptionId]
  );

  return <PopoverProvider value={value}>{children}</PopoverProvider>;
};

if (__DEV__) {
  Popover.displayName = 'Popover';
}
