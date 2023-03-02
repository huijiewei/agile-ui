import { runIfFn } from '@agile-ui/utils';
import {
  arrow,
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
} from '@floating-ui/react';
import type { PropsWithChildren, ReactNode, RefObject } from 'react';
import { useId, useMemo, useRef } from 'react';
import {
  PopoverAriaProvider,
  PopoverDispatchProvider,
  PopoverFloatingProvider,
  PopoverReferenceProvider,
} from './PopoverProvider';
import { useDisclosure } from '@agile-ui/react-hooks';
import type { MotionComponentProps } from '../motion/Motion';
import { FloatingArrowProvider } from '../floating/FloatingArrow';

export type PopoverProps = {
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
   * 关闭时的回调
   */
  onClose?: () => void;

  /**
   * 开启后焦点目标
   */
  initialFocus?: number | RefObject<HTMLElement>;

  /**
   * 是否 modal
   * @default true
   */
  modal?: boolean;

  /**
   * 按下 Esc 键时, 弹出框将关闭
   * @default true
   */
  closeOnEsc?: boolean;

  /**
   * 单击外部时, 弹出框将关闭
   * @default true
   */
  closeOnBlur?: boolean;

  /**
   * @ignore
   */
  children?: ReactNode | ((props: { opened: boolean; handleClose?: () => void }) => ReactNode);
} & MotionComponentProps;

export const Popover = (props: PropsWithChildren<PopoverProps>) => {
  const {
    children,
    placement = 'auto',
    closeOnEsc = true,
    closeOnBlur = true,
    modal = true,
    opened,
    onClose,
    initialFocus,
    motionPreset = 'fade',
    motionProps,
  } = props;

  const arrowRef = useRef<SVGSVGElement>(null);

  const { open, handleOpen, handleClose } = useDisclosure({ opened, onClose });

  const { x, y, refs, context } = useFloating({
    middleware: [
      offset(8),
      placement == 'auto' ? autoPlacement() : flip(),
      shift({ padding: 8 }),
      arrow({
        element: arrowRef,
      }),
    ],
    open,
    onOpenChange: (opened) => {
      opened ? handleOpen() : handleClose();
    },
    placement: placement == 'auto' ? undefined : placement,
    whileElementsMounted: autoUpdate,
  });

  const id = useId();
  const labelId = `${id}-label`;
  const descriptionId = `${id}-description`;

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context),
    useRole(context),
    useDismiss(context, { escapeKey: closeOnEsc, outsidePress: closeOnBlur }),
  ]);

  const contextValue = useMemo(
    () => ({
      labelId,
      descriptionId,
    }),
    [descriptionId, labelId]
  );

  const referenceContextValue = useMemo(
    () => ({
      open,
      setReference: refs.setReference,
      getReferenceProps,
    }),
    [getReferenceProps, open, refs.setReference]
  );

  const floatingContextValue = useMemo(
    () => ({
      x,
      y,
      open,
      context,
      setFloating: refs.setFloating,
      getFloatingProps,
      modal,
      initialFocus,
      motionPreset,
      motionProps,
    }),
    [context, refs.setFloating, getFloatingProps, initialFocus, modal, motionPreset, motionProps, open, x, y]
  );

  const arrowContextValue = useMemo(
    () => ({
      setArrow: arrowRef,
      context,
      color: 'white',
      borderColor: 'gray.200',
    }),
    [context]
  );

  return (
    <PopoverAriaProvider value={contextValue}>
      <FloatingArrowProvider value={arrowContextValue}>
        <PopoverDispatchProvider value={{ handleClose }}>
          <PopoverReferenceProvider value={referenceContextValue}>
            <PopoverFloatingProvider value={floatingContextValue}>
              {runIfFn(children, { opened: open, handleClose })}
            </PopoverFloatingProvider>
          </PopoverReferenceProvider>
        </PopoverDispatchProvider>
      </FloatingArrowProvider>
    </PopoverAriaProvider>
  );
};

Popover.displayName = 'Popover';
