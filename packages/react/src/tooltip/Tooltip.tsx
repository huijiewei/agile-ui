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
import { cloneElement, ReactNode } from 'react';
import { cx } from '@twind/core';
import { Portal } from '../portal/Portal';
import type { PrimitiveComponentProps } from '../utils/component';
import type { ScaleColor } from '../utils/types';
import { AnimatePresence } from 'framer-motion';
import { getMotionProps, Motion, MotionComponentProps } from '../motion/Motion';
import { useDisclosure, useMergedRefs } from '@agile-ui/react-hooks';
import { FloatingArrow } from '../floating/FloatingArrow';

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
  const refs = useMergedRefs((children as any).ref, reference);

  return (
    <>
      {cloneElement(children, getReferenceProps({ ref: refs, ...children.props }))}
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
              {...getFloatingProps({
                ...rest,
                ref: floating,
                style: {
                  top: y ? `${y}px` : '',
                  left: x ? `${x}px` : '',
                },
              })}
            >
              {content}
              <FloatingArrow
                placement={placementState}
                className={`border-${color}-600 bg-${color}-600 text-${color}-50`}
              />
            </Motion>
          )}
        </AnimatePresence>
      </Portal>
    </>
  );
};

Tooltip.displayName = 'Tooltip';
