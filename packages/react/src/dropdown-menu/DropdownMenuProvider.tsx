import type {
  FloatingContext,
  FloatingTreeType,
  Placement,
  ReferenceElement,
} from '@floating-ui/react-dom-interactions';
import type { Dispatch, HTMLProps, MutableRefObject, SetStateAction } from 'react';
import type { AnimationBaseProps } from '../animation/Animation';
import { createContext } from '../utils/context';

const [DropdownMenuPlacementProvider, useDropdownMenuPlacement] = createContext<Placement>({
  strict: true,
  name: 'DropdownMenuPlacementContext',
});

export { DropdownMenuPlacementProvider, useDropdownMenuPlacement };

type DropdownMenuReferenceContextValue = {
  open: boolean;
  reference: (node: HTMLElement) => void;
  getReferenceProps: (userProps?: HTMLProps<Element> | undefined) => Record<string, unknown>;
};

const [DropdownMenuReferenceProvider, useDropdownMenuReference] = createContext<DropdownMenuReferenceContextValue>({
  strict: true,
  name: 'DropdownMenuReferenceContext',
});

export { DropdownMenuReferenceProvider, useDropdownMenuReference };

type DropdownMenuContentContextValue = {
  tree: FloatingTreeType<ReferenceElement> | null;
  allowHover: boolean;
  getItemProps: (userProps?: HTMLProps<HTMLElement> | undefined) => Record<string, unknown>;
  listItemsRef: MutableRefObject<(HTMLElement | null)[]>;
  setActiveIndex: Dispatch<SetStateAction<number | null>>;
};

const [DropdownMenuContentProvider, useDropdownMenuContent] = createContext<DropdownMenuContentContextValue>({
  strict: true,
  name: 'DropdownMenuContentContext',
});

export { DropdownMenuContentProvider, useDropdownMenuContent };

type DropdownMenuFloatingContextValue = DropdownMenuContentContextValue & {
  open: boolean;
  x: number | null;
  y: number | null;

  context: FloatingContext<HTMLElement>;
  floating: (node: HTMLElement) => void;
  getFloatingProps: (userProps?: HTMLProps<HTMLElement> | undefined) => Record<string, unknown>;

  animation: Required<AnimationBaseProps>;
  nested: boolean;
};

const [DropdownMenuFloatingProvider, useDropdownMenuFloating] = createContext<DropdownMenuFloatingContextValue>({
  strict: true,
  name: 'DropdownMenuFloatingContext',
});

export { DropdownMenuFloatingProvider, useDropdownMenuFloating };

const [DropdownMenuItemIndexProvider, useDropdownMenuItemIndex] = createContext<number>({
  strict: true,
  name: 'DropdownMenuItemIndexContext',
});

export { DropdownMenuItemIndexProvider, useDropdownMenuItemIndex };

type DropdownMenuDispatchContextValue = {
  handleClose: () => void;
};

const [DropdownMenuDispatchProvider, useDropdownMenuDispatch] = createContext<DropdownMenuDispatchContextValue>({
  strict: true,
  name: 'PopoverDispatchContext',
});

export { DropdownMenuDispatchProvider, useDropdownMenuDispatch };
