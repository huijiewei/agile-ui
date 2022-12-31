import {
  autoUpdate,
  flip,
  FloatingNode,
  offset,
  Placement,
  safePolygon,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useFloatingNodeId,
  useFloatingParentNodeId,
  useFloatingTree,
  useHover,
  useInteractions,
  useListNavigation,
  useRole,
} from '@floating-ui/react';
import { PropsWithChildren, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useAllowHover } from '@agile-ui/react-hooks';
import {
  DropdownMenuDispatchProvider,
  DropdownMenuFloatingProvider,
  DropdownMenuPlacementProvider,
  DropdownMenuReferenceProvider,
} from './DropdownMenuProvider';
import type { MotionComponentProps } from '../motion/Motion';

export type DropdownMenuProps = {
  /**
   * 默认开启状态
   */
  opened?: boolean;

  /**
   * 关闭时的回调
   */
  onClose?: () => void;

  /**
   * 按下 Esc 键时, 弹出菜单将关闭
   * @default true
   */
  closeOnEsc?: boolean;

  /**
   * 单击外部时, 弹出菜单将关闭
   * @default true
   */
  closeOnBlur?: boolean;

  /**
   * 选择项目后, 弹出菜单将关闭
   * @default true
   */
  closeOnSelect?: boolean;

  /**
   * 放置位置
   * @default 'bottom-start'
   */
  placement?: Placement;

  /**
   * @ignore
   */
  children?: ReactNode;
} & MotionComponentProps;

export const DropdownMenuComponent = (props: PropsWithChildren<DropdownMenuProps>) => {
  const {
    children,
    closeOnEsc = true,
    closeOnBlur = true,
    closeOnSelect = true,
    opened = false,
    placement = 'bottom-start',
    onClose,
    motionPreset = 'fade',
    motionProps,
  } = props;

  const tree = useFloatingTree();
  const nodeId = useFloatingNodeId();
  const parentId = useFloatingParentNodeId();
  const nested = parentId != null;

  const [open, setOpen] = useState(opened);

  const listItemsRef = useRef<(HTMLElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const allowHover = useAllowHover();

  const {
    x,
    y,
    reference,
    floating,
    context,
    placement: placementState,
  } = useFloating<HTMLElement>({
    middleware: [offset({ mainAxis: 8, alignmentAxis: nested ? -5 : 0 }), flip(), shift({ padding: 8 })],
    open,
    onOpenChange: (opened) => {
      setOpen(opened);

      if (!opened) {
        onClose && onClose();
      }
    },
    nodeId,
    placement: nested ? 'right-start' : placement,
    whileElementsMounted: autoUpdate,
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
    useHover(context, {
      enabled: nested && allowHover,
      handleClose: safePolygon(),
    }),
    useClick(context, { toggle: !nested || !allowHover, event: 'mousedown', ignoreMouse: nested }),
    useRole(context, { role: 'menu' }),
    useDismiss(context, { escapeKey: closeOnEsc, outsidePress: closeOnBlur }),
    useListNavigation(context, {
      listRef: listItemsRef,
      activeIndex,
      nested,
      onNavigate: setActiveIndex,
    }),
  ]);

  const handleClose = useCallback(() => {
    setOpen(false);

    onClose && onClose();
  }, [onClose]);

  useEffect(() => {
    const handleClick = () => {
      if (closeOnSelect) {
        handleClose();
      }
    };

    tree?.events.on('click', handleClick);

    return () => {
      tree?.events.off('click', handleClick);
    };
  }, [tree, handleClose, closeOnSelect]);

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
      open,
      x,
      y,
      context,
      floating,
      getFloatingProps,
      nested,
      tree,
      allowHover,
      getItemProps,
      listItemsRef,
      setActiveIndex,
      motionPreset,
      motionProps,
    }),
    [allowHover, context, floating, getFloatingProps, getItemProps, motionPreset, motionProps, nested, open, tree, x, y]
  );

  return (
    <DropdownMenuPlacementProvider value={placementState}>
      <DropdownMenuReferenceProvider value={referenceContextValue}>
        <DropdownMenuFloatingProvider value={floatingContextValue}>
          <DropdownMenuDispatchProvider value={{ handleClose }}>
            <FloatingNode id={nodeId}>{children}</FloatingNode>
          </DropdownMenuDispatchProvider>
        </DropdownMenuFloatingProvider>
      </DropdownMenuReferenceProvider>
    </DropdownMenuPlacementProvider>
  );
};

DropdownMenuComponent.displayName = 'DropdownMenuComponent';
