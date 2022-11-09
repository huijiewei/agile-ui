import { runIfFn } from '@agile-ui/utils';
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
import type { PropsWithChildren, ReactNode, RefObject } from 'react';
import { useId, useMemo } from 'react';
import {
  PopoverAriaProvider,
  PopoverDispatchProvider,
  PopoverFloatingProvider,
  PopoverPlacementProvider,
  PopoverReferenceProvider,
} from './PopoverProvider';
import { useDisclosure } from '@agile-ui/react-hooks';

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
};

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
  } = props;

  const { open, handleOpen, handleClose } = useDisclosure({ opened, onClose });

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

  const id = useId();
  const labelId = `${id}-label`;
  const descriptionId = `${id}-description`;

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context),
    useRole(context),
    useDismiss(context, { escapeKey: closeOnEsc, outsidePress: closeOnBlur }),
  ]);

  const ariaContextValue = useMemo(
    () => ({
      labelId,
      descriptionId,
    }),
    [descriptionId, labelId]
  );

  const referenceContextValue = useMemo(
    () => ({
      open,
      reference,
      getReferenceProps,
    }),
    [getReferenceProps, open, reference]
  );

  const floatingContextValue = useMemo(
    () => ({
      x,
      y,
      open,
      context,
      floating,
      getFloatingProps,
      modal,
      initialFocus,
    }),
    [context, floating, getFloatingProps, initialFocus, modal, open, x, y]
  );

  return (
    <PopoverAriaProvider value={ariaContextValue}>
      <PopoverPlacementProvider value={placementState}>
        <PopoverDispatchProvider value={{ handleClose }}>
          <PopoverReferenceProvider value={referenceContextValue}>
            <PopoverFloatingProvider value={floatingContextValue}>
              {runIfFn(children, { opened: open, handleClose })}
            </PopoverFloatingProvider>
          </PopoverReferenceProvider>
        </PopoverDispatchProvider>
      </PopoverPlacementProvider>
    </PopoverAriaProvider>
  );
};

Popover.displayName = 'Popover';
