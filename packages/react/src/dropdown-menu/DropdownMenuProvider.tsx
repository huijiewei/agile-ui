import type {
  FloatingContext,
  FloatingTreeType,
  Placement,
  ReferenceElement,
} from '@floating-ui/react';
import type { Dispatch, HTMLProps, MutableRefObject, SetStateAction } from 'react';
import { createContext } from '../utils/context';
import type { Dict } from '@agile-ui/utils';

const [DropdownMenuPlacementProvider, useDropdownMenuPlacement] = createContext<Placement>({
  strict: true,
  name: 'DropdownMenuPlacementContext',
});

export { DropdownMenuPlacementProvider, useDropdownMenuPlacement };

type DropdownMenuReferenceContextValue = {
  open: boolean;
  reference: (node: HTMLElement) => void;
  getReferenceProps: (userProps?: HTMLProps<Element> | undefined) => Dict<unknown>;
};

const [DropdownMenuReferenceProvider, useDropdownMenuReference] = createContext<DropdownMenuReferenceContextValue>({
  strict: true,
  name: 'DropdownMenuReferenceContext',
});

export { DropdownMenuReferenceProvider, useDropdownMenuReference };

type DropdownMenuContentContextValue = {
  tree: FloatingTreeType<ReferenceElement> | null;
  allowHover: boolean;
  getItemProps: (userProps?: HTMLProps<HTMLElement> | undefined) => Dict<unknown>;
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
  getFloatingProps: (userProps?: HTMLProps<HTMLElement> | undefined) => Dict<unknown>;

  nested: boolean;
  nodeId: string;
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
