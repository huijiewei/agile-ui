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
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from '@floating-ui/react-dom-interactions';
import { ComponentProps, ReactNode, RefObject, useEffect, useRef, useState } from 'react';
import { twClsx } from '../utils/tailwind';

type TooltipProps = ComponentProps<'div'> & {
  content: ReactNode;
  placement?: 'auto' | Placement;
  trigger?: 'hover' | 'click';
  style?: 'dark' | 'light' | 'auto';
  animation?: false | `duration-${number}`;
  arrow?: boolean;
  arrowClassName?: string;
};

export const Tooltip = (props: TooltipProps) => {
  const {
    className,
    arrowClassName,
    children,
    content,
    placement = 'auto',
    animation = 'duration-200',
    trigger = 'hover',
    style = 'auto',
    arrow = true,
    ...rest
  } = props;
  const arrowRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);

  const floatingTooltip = useFloating<HTMLElement>({
    middleware: floatingMiddleware({ arrowRef, placement }),
    open,
    onOpenChange: setOpen,
    placement: placement === 'auto' ? undefined : placement,
  });

  const {
    context,
    floating,
    middlewareData: { arrow: { x: arrowX, y: arrowY } = {} },
    reference,
    refs,
    strategy,
    update,
    x,
    y,
  } = floatingTooltip;

  const { getFloatingProps, getReferenceProps } = useInteractions([
    useClick(context, { enabled: trigger === 'click' }),
    useFocus(context),
    useHover(context, { enabled: trigger === 'hover' }),
    useRole(context, { role: 'tooltip' }),
  ]);

  useEffect(() => {
    if (refs.reference.current && refs.floating.current && open) {
      return autoUpdate(refs.reference.current, refs.floating.current, update);
    }
  }, [open, refs.floating, refs.reference, update]);

  return (
    <>
      <div className={'w-fit'} {...getReferenceProps({ ref: reference })}>
        {children}
      </div>
      <div
        {...getFloatingProps({
          className: twClsx(
            'absolute inline-block rounded py-1.5 px-2.5 text-sm font-medium shadow-sm',
            animation !== false && `transition-opacity ${animation}`,
            {
              'invisible opacity-0': !open,
              'border bg-gray-900 border-gray-900 text-white dark:border-gray-700 dark:bg-gray-700': style === 'dark',
              'border border-gray-200 bg-white text-gray-900': style === 'light',
              'border border-gray-200 bg-white text-gray-900 dark:border-gray-700 dark:bg-gray-700 dark:text-white':
                style === 'auto',
            },
            className
          ),
          ref: floating,
          style: {
            position: strategy,
            top: y ?? '',
            left: open ? x ?? '' : 0,
          },
          ...rest,
        })}
      >
        <div className="relative z-20">{content}</div>
        {arrow && (
          <TooltipArrow
            style={style}
            arrowRef={arrowRef}
            arrowX={arrowX}
            arrowY={arrowY}
            placement={floatingTooltip.placement}
            className={arrowClassName}
          />
        )}
      </div>
    </>
  );
};

type TooltipArrowPlacement = 'top' | 'left' | 'bottom' | 'right';

const tooltipArrowStyles = {
  top: 'border-t border-l',
  right: 'border-t border-r',
  bottom: 'border-b border-r',
  left: 'border-b border-l',
};

const TooltipArrow = ({
  style,
  arrowRef,
  arrowX,
  arrowY,
  placement,
  className,
}: {
  style: 'dark' | 'light' | 'auto';
  arrowRef: RefObject<HTMLDivElement>;
  arrowX?: number;
  arrowY?: number;
  placement: Placement;
  className?: string;
}) => {
  const arrowPlacement = floatingArrowPlacement({ placement });

  return (
    <div
      className={twClsx(
        'absolute z-10 h-2 w-2 rotate-45',
        {
          'border-gray-900 bg-gray-900 dark:border-gray-700 dark:bg-gray-700': style === 'dark',
          'border-gray-200 bg-white': style === 'light',
          'border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-700': style === 'auto',
        },
        tooltipArrowStyles[arrowPlacement],
        className
      )}
      ref={arrowRef}
      style={{
        top: arrowY ?? '',
        left: arrowX ?? '',
        right: '',
        bottom: '',
        [arrowPlacement]: '-4px',
      }}
    >
      &nbsp;
    </div>
  );
};

const floatingMiddleware = ({
  arrowRef,
  placement,
}: {
  arrowRef: RefObject<HTMLDivElement>;
  placement: 'auto' | Placement;
}): Middleware[] => {
  const middleware = [];

  middleware.push(offset(8));
  middleware.push(placement === 'auto' ? autoPlacement() : flip());
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
