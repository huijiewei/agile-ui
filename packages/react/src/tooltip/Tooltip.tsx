import { __DEV__ } from '@agile-ui/utils';
import {
  arrow,
  autoPlacement,
  autoUpdate,
  flip,
  Middleware,
  offset,
  Placement,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from '@floating-ui/react-dom-interactions';
import { ComponentProps, ReactNode, RefObject, useEffect, useRef, useState } from 'react';
import { tx } from 'twind';
import { Animation } from '../animation/Animation';
import { polymorphicComponent } from '../utils/polymorphic';
import type { Color } from '../utils/types';

type TooltipProps = ComponentProps<'div'> & {
  content: ReactNode;
  placement?: 'auto' | Placement;
  trigger?: 'hover' | 'click';
  animation?: {
    transition?: string;
    duration?: number;
    enter?: string;
    exit?: string;
  };
  arrow?: boolean;
  color?: Color;
};

export const Tooltip = (props: TooltipProps) => {
  const {
    className,
    children,
    content,
    placement = 'auto',
    animation = {
      transition: 'transition-opacity',
      duration: 300,
      enter: 'opacity-100',
      exit: 'opacity-0',
    },
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
    refs,
    update,
    placement: placementState,
    middlewareData: { arrow: { x: arrowX, y: arrowY } = {} },
  } = useFloating<HTMLElement>({
    middleware: floatingMiddleware({ arrowRef, placement }),
    open,
    onOpenChange: setOpen,
    placement: placement === 'auto' ? undefined : placement,
    strategy: 'absolute',
  });

  const { getFloatingProps, getReferenceProps } = useInteractions([
    useRole(context, { role: 'tooltip' }),
    useDismiss(context),
    useClick(context, { enabled: trigger == 'click' }),
    useHover(context, { enabled: trigger == 'hover' }),
    useFocus(context),
  ]);

  useEffect(() => {
    if (refs.reference.current && refs.floating.current && open) {
      return autoUpdate(refs.reference.current, refs.floating.current, update);
    }
  }, [open, refs.floating, refs.reference, update]);

  console.log(x, y);

  return (
    <>
      <div className={'w-fit'} {...getReferenceProps({ ref: reference })}>
        {children}
      </div>
      <Animation
        show={open}
        {...animation}
        className={tx(
          `${strategy}`,
          y != null && (y >= 0 ? `top-[${y}px]` : `-top-[${-y}px]`),
          x != null && (x >= 0 ? `left-[${x}px]` : `-left-[${-x}px]`),
          'inline-block rounded py-1.5 px-2.5 text-sm font-medium shadow-sm border',
          `border-${color}-200 bg-${color}-50 text-${color}-900`,
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
            className={tx(`border-${color}-200 bg-${color}-50 text-${color}-900`)}
          />
        )}
      </Animation>
    </>
  );
};

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
  const arrowPlacement = floatingArrowPlacement({ placement });

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

const floatingArrowPlacement = ({ placement }: { placement: Placement }): TooltipArrowPlacement => {
  return {
    top: 'bottom',
    right: 'left',
    bottom: 'top',
    left: 'right',
  }[placement.split('-')[0]] as TooltipArrowPlacement;
};
