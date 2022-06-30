import { __DEV__ } from '@agile-ui/utils';
import {
  autoPlacement,
  autoUpdate,
  flip,
  offset,
  Placement,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
  FloatingPortal,
} from '@floating-ui/react-dom-interactions';
import { cloneElement, ReactElement, ReactNode, useState } from 'react';
import { cx } from 'twind';
import { Animation, AnimationBaseProps } from '../animation/Animation';
import type { PrimitiveComponentProps } from '../utils/component';
import type { ScaleColor } from '../utils/types';

type TooltipProps = {
  /**
   * 提示内容
   */
  content: ReactNode;

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
   * 显示箭头
   * @default true
   */
  arrow?: boolean;

  /**
   * 颜色
   * @default 'slate'
   */
  color?: ScaleColor;
};

/**
 * 工具提示
 */
export const Tooltip = (props: PrimitiveComponentProps<'div', TooltipProps>) => {
  const { className, children, content, placement = 'auto', animation, arrow = true, color = 'slate', ...rest } = props;

  const [open, setOpen] = useState(false);

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
    onOpenChange: setOpen,
    placement: placement == 'auto' ? undefined : placement,
    whileElementsMounted: autoUpdate,
  });

  const { getFloatingProps, getReferenceProps } = useInteractions([
    useHover(context),
    useFocus(context),
    useRole(context, { role: 'tooltip' }),
    useDismiss(context),
  ]);

  const target = children as ReactElement;

  return (
    <>
      {cloneElement(target, getReferenceProps({ ref: reference, ...target.props }))}
      <FloatingPortal>
        <Animation
          show={open}
          {...animation}
          {...rest}
          className={cx(
            'absolute inline-block rounded py-1 px-2 text-sm border z-50',
            `border-${color}-700 bg-${color}-700 text-${color}-50`,
            className
          )}
          style={{
            top: y ? `${y}px` : '',
            left: x ? `${x}px` : '',
          }}
          {...getFloatingProps({
            ref: floating,
          })}
        >
          {content}
          <TooltipArrow visible={arrow} color={color} placement={placementState} />
        </Animation>
      </FloatingPortal>
    </>
  );
};

if (__DEV__) {
  Tooltip.displayName = 'Tooltip';
}

type TooltipArrowSide = 'top' | 'left' | 'bottom' | 'right';
type TooltipArrowPosition = 'center' | 'start' | 'end';

const tooltipArrowStyles = {
  top: 'border-t border-l',
  right: 'border-t border-r',
  bottom: 'border-b border-r',
  left: 'border-b border-l',
};

type TooltipArrowProps = {
  placement: Placement;
  color?: ScaleColor;
  visible?: boolean;
};

const opposites = { top: 'bottom', right: 'left', bottom: 'top', left: 'right' };

const TooltipArrow = (props: PrimitiveComponentProps<'span', TooltipArrowProps>) => {
  const { placement, visible, className, color, ...rest } = props;

  if (!visible) {
    return null;
  }

  const [side, position = 'center'] = placement.split('-') as [TooltipArrowSide, TooltipArrowPosition];
  const horizontal = side == 'left' || side == 'right';

  return (
    <span
      className={cx(
        'absolute h-[8px] w-[8px] rotate-45',
        `-${opposites[side]}-[4px]`,
        position == 'center'
          ? `${horizontal ? 'top' : 'left'}-[calc(50%-4px)]`
          : position == 'start'
          ? `${horizontal ? 'top' : 'left'}-[8px]`
          : `${horizontal ? 'bottom' : 'right'}-[8px]`,
        tooltipArrowStyles[side],
        `border-${color}-700 bg-${color}-700 text-${color}-50`,
        className
      )}
      {...rest}
    >
      &nbsp;
    </span>
  );
};

if (__DEV__) {
  TooltipArrow.displayName = 'TooltipArrow';
}
