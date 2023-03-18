import {
  arrow,
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
} from '@floating-ui/react';
import { cloneElement, ReactNode, useMemo, useRef } from 'react';
import { cx } from '@twind/core';
import { Portal } from '../portal/Portal';
import type { PrimitiveComponentProps } from '../utils/component';
import type { ScaleColor } from '../utils/types';
import { AnimatePresence } from 'framer-motion';
import { getMotionProps, Motion, MotionComponentProps } from '../motion/Motion';
import { useDisclosure, useMergedRefs } from '@agile-ui/react-hooks';
import { FloatingArrowComponent, FloatingArrowContextValue, FloatingArrowProvider } from '../floating/FloatingArrow';

type TooltipProps = {
  /**
   * 提示内容
   */
  content: ReactNode;

  /**
   * 颜色
   * @default 'gray'
   */
  color?: ScaleColor;

  /**
   * 放置位置
   * @default 'auto'
   */
  placement?: 'auto' | Placement;

  /**
   * 控制打开状态
   */
  opened?: boolean;

  /**
   * @ignore
   */
  children: JSX.Element;
} & MotionComponentProps;

/**
 * 工具提示
 */
export const Tooltip = (props: PrimitiveComponentProps<'div', TooltipProps>) => {
  const {
    className,
    children,
    content,
    opened,
    placement = 'auto',
    color = 'gray',
    motionPreset = 'fade',
    motionProps,
    ...rest
  } = props;

  const { open, handleOpen, handleClose } = useDisclosure({ opened });

  const arrowRef = useRef<SVGSVGElement>(null);

  const { x, y, refs, context } = useFloating({
    middleware: [
      offset(8),
      placement == 'auto' ? autoPlacement() : flip(),
      shift({ padding: 8 }),
      arrow({
        element: arrowRef,
        padding: 4,
      }),
    ],
    open,
    onOpenChange: (opened) => {
      opened ? handleOpen() : handleClose();
    },
    placement: placement == 'auto' ? undefined : placement,
    whileElementsMounted: autoUpdate,
  });

  const { getFloatingProps, getReferenceProps } = useInteractions([
    useHover(context),
    useFocus(context),
    useRole(context, { role: 'tooltip' }),
    useDismiss(context),
  ]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const referenceRefs = useMergedRefs((children as any).ref, refs.setReference);

  const arrowContextValue = useMemo<FloatingArrowContextValue>(
    () => ({
      setArrow: arrowRef,
      context,
      color: `${color}.600`,
      borderColor: `${color}.600`,
    }),
    [context, color]
  );

  return (
    <FloatingArrowProvider value={arrowContextValue}>
      {cloneElement(children, getReferenceProps({ ref: referenceRefs, ...children.props }))}
      <Portal>
        <AnimatePresence>
          {open && (
            <Motion
              {...getMotionProps(motionPreset, motionProps)}
              className={cx(
                'absolute z-50 inline-block rounded border py-1 px-2 text-sm shadow',
                `border-${color}-600 bg-${color}-600 text-${color}-50`,
                className
              )}
              ref={refs.setFloating}
              style={{
                top: y ? `${y}px` : '',
                left: x ? `${x}px` : '',
              }}
              {...getFloatingProps({
                ...rest,
              })}
            >
              {content}
              <FloatingArrowComponent width={10} height={5} />
            </Motion>
          )}
        </AnimatePresence>
      </Portal>
    </FloatingArrowProvider>
  );
};

Tooltip.displayName = 'Tooltip';
