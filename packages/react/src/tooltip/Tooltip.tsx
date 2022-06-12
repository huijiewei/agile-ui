import { __DEV__ } from '@agile-ui/utils';
import {
  arrow,
  autoPlacement,
  autoUpdate,
  flip,
  FloatingPortal,
  Middleware,
  offset,
  Placement,
  safePolygon,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from '@floating-ui/react-dom-interactions';
import { ReactNode, RefObject, useRef, useState } from 'react';
import { tx } from 'twind';
import { Animation, AnimationBaseProps } from '../animation/Animation';
import { polymorphicComponent, primitiveComponent } from '../utils/component';
import type { Color } from '../utils/types';

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
   * 触发方式
   * @default 'hover'
   */
  trigger?: 'hover' | 'click';

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
  color?: Color;
};

/**
 * 工具提示
 */
export const Tooltip = primitiveComponent<'div', TooltipProps>((props, ref) => {
  const {
    className,
    children,
    content,
    placement = 'auto',
    animation,
    trigger = 'hover',
    arrow = true,
    color = 'slate',
    ...rest
  } = props;
  const arrowRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);

  const {
    x,
    y,
    reference,
    floating,
    strategy,
    context,
    placement: placementState,
    middlewareData: { arrow: { x: arrowX, y: arrowY } = {} },
  } = useFloating<HTMLElement>({
    middleware: floatingMiddleware({ arrowRef, placement }),
    open,
    onOpenChange: setOpen,
    placement: placement == 'auto' ? undefined : placement,
    strategy: 'absolute',
    whileElementsMounted: autoUpdate,
  });

  const { getFloatingProps, getReferenceProps } = useInteractions([
    useRole(context, { role: 'tooltip' }),
    useDismiss(context),
    useClick(context, { enabled: trigger == 'click' }),
    useHover(context, { enabled: trigger == 'hover', handleClose: safePolygon() }),
    useFocus(context),
  ]);

  return (
    <>
      <div className={'w-fit'} {...getReferenceProps({ ref: reference })}>
        {children}
      </div>
      <FloatingPortal>
        <Animation
          ref={ref}
          show={open}
          {...animation}
          className={tx(
            `${strategy}`,
            y != null && (y >= 0 ? `top-[${y}px]` : `-top-[${-y}px]`),
            x != null && (x >= 0 ? `left-[${x}px]` : `-left-[${-x}px]`),
            'inline-block rounded py-1 px-2 text-sm font-medium shadow-sm border z-50',
            `border-${color}-700 bg-${color}-700 text-${color}-50`,
            className
          )}
          {...getFloatingProps({
            ref: floating,
            ...rest,
          })}
        >
          {content}
          {arrow && (
            <TooltipArrow
              ref={arrowRef}
              arrowX={arrowX}
              arrowY={arrowY}
              strategy={strategy}
              placement={placementState}
              className={tx(`border-${color}-700 bg-${color}-700 text-${color}-50`)}
            />
          )}
        </Animation>
      </FloatingPortal>
    </>
  );
});

if (__DEV__) {
  Tooltip.displayName = 'Tooltip';
}

type TooltipArrowPlacement = 'top' | 'left' | 'bottom' | 'right';

const tooltipArrowStyles = {
  top: 'border-t border-l',
  right: 'border-t border-r',
  bottom: 'border-b border-r',
  left: 'border-b border-l',
};

type TooltipArrowProps = {
  arrowX?: number;
  arrowY?: number;
  strategy: 'fixed' | 'absolute';
  placement: Placement;
  className?: string;
};

const TooltipArrow = polymorphicComponent<'span', TooltipArrowProps>((props, ref) => {
  const { as: Component = 'span', arrowX, arrowY, strategy, placement, className, ...rest } = props;
  const arrowPlacement = floatingArrowPlacement(placement);

  return (
    <Component
      className={tx(
        `${strategy}`,
        arrowX != null && `left-[${arrowX}px] `,
        arrowY != null && `top-[${arrowY}px] `,
        `-${arrowPlacement}-[4px]`,
        'h-[8px] w-[8px] rotate-45',
        tooltipArrowStyles[arrowPlacement],
        className
      )}
      ref={ref}
      {...rest}
    >
      &nbsp;
    </Component>
  );
});

if (__DEV__) {
  TooltipArrow.displayName = 'TooltipArrow';
}

const floatingMiddleware = ({
  arrowRef,
  placement,
}: {
  arrowRef: RefObject<HTMLDivElement>;
  placement: 'auto' | Placement;
}): Middleware[] => {
  const middleware = [];

  middleware.push(offset(8));
  middleware.push(placement == 'auto' ? autoPlacement() : flip());
  middleware.push(shift({ padding: 8 }));

  if (arrowRef.current) {
    middleware.push(arrow({ element: arrowRef.current }));
  }

  return middleware;
};

const floatingArrowPlacement = (placement: Placement): TooltipArrowPlacement => {
  return {
    top: 'bottom',
    right: 'left',
    bottom: 'top',
    left: 'right',
  }[placement.split('-')[0]] as TooltipArrowPlacement;
};
