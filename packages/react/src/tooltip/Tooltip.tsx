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
} from '@floating-ui/react-dom-interactions';
import { cloneElement, ReactNode, useState } from 'react';
import { cx } from 'twind';
import { Portal } from '../portal/Portal';
import type { PrimitiveComponentProps } from '../utils/component';
import type { ScaleColor } from '../utils/types';
import { TooltipArrow } from './TooltipArrow';
import { AnimatePresence } from 'framer-motion';
import { Motion } from '../motion/Motion';
import { useMergedRefs } from '@agile-ui/react-hooks';

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
   * @ignore
   */
  children: JSX.Element;
};

/**
 * 工具提示
 */
export const Tooltip = (props: PrimitiveComponentProps<'div', TooltipProps>) => {
  const { className, children, content, placement = 'auto', color = 'gray', ...rest } = props;

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const refs = useMergedRefs((children as any).ref, reference);

  return (
    <>
      {cloneElement(children, getReferenceProps({ ref: refs, ...children.props }))}
      <Portal>
        <AnimatePresence>
          {open && (
            <Motion
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={cx(
                'absolute shadow inline-block rounded py-1 px-2 text-sm border z-50',
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
              <TooltipArrow color={color} placement={placementState} />
            </Motion>
          )}
        </AnimatePresence>
      </Portal>
    </>
  );
};

if (__DEV__) {
  Tooltip.displayName = 'Tooltip';
}
