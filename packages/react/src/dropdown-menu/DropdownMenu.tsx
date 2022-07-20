import { useAllowHover } from '@agile-ui/react-hooks';
import { __DEV__ } from '@agile-ui/utils';
import {
  autoUpdate,
  flip,
  FloatingNode,
  FloatingTree,
  offset,
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
} from '@floating-ui/react-dom-interactions';
import type { PropsWithChildren, ReactNode } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { AnimationBaseProps } from '../animation/Animation';
import {
  DropdownMenuDispatchProvider,
  DropdownMenuFloatingProvider,
  DropdownMenuPlacementProvider,
  DropdownMenuReferenceProvider,
} from './DropdownMenuProvider';

export type DropdownMenuProps = {
  /**
   * 动画
   * @default 'hover'
   */
  animation?: AnimationBaseProps;

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
   * @ignore
   */
  children?: ReactNode;
};

const DropdownMenuComponent = (props: PropsWithChildren<DropdownMenuProps>) => {
  const {
    children,
    animation = { duration: 200 },
    closeOnEsc = true,
    closeOnBlur = true,
    opened = false,
    onClose,
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
    refs,
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
    placement: nested ? 'right-start' : 'bottom-start',
    whileElementsMounted: autoUpdate,
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
    useHover(context, {
      enabled: nested && allowHover,
      handleClose: safePolygon(),
    }),
    useClick(context, { toggle: !nested, pointerDown: true, ignoreMouse: nested }),
    useRole(context, { role: 'menu' }),
    useDismiss(context, { escapeKey: closeOnEsc, outsidePointerDown: closeOnBlur }),
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
      handleClose();

      if (parentId == null) {
        refs.reference.current?.focus();
      }
    };

    tree?.events.on('click', handleClick);

    return () => {
      tree?.events.off('click', handleClick);
    };
  }, [parentId, tree, refs, handleClose]);

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
      animation: {
        duration: 200,
        enter: 'opacity-100',
        exit: 'opacity-0',
        transition: 'transition-opacity',
        ...animation,
      },

      tree,
      allowHover,
      getItemProps,
      listItemsRef,
      setActiveIndex,
    }),
    [allowHover, animation, context, floating, getFloatingProps, getItemProps, nested, open, tree, x, y]
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

if (__DEV__) {
  DropdownMenuComponent.displayName = 'DropdownMenuComponent';
}

export const DropdownMenu = (props: PropsWithChildren<DropdownMenuProps>) => {
  const parentId = useFloatingParentNodeId();

  if (parentId == null) {
    return (
      <FloatingTree>
        <DropdownMenuComponent {...props} />
      </FloatingTree>
    );
  }

  return <DropdownMenuComponent {...props} />;
};

if (__DEV__) {
  DropdownMenu.displayName = 'DropdownMenu';
}
