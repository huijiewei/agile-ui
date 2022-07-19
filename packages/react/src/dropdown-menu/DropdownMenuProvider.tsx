import type { FloatingContext, Placement } from '@floating-ui/react-dom-interactions';
import type { HTMLProps } from 'react';
import type { AnimationBaseProps } from '../animation/Animation';
import { createContext } from '../utils/context';

type DropdownMenuContextValue = {
  x: number | null;
  y: number | null;
  open: boolean;
  context: FloatingContext<HTMLElement>;
  reference: (node: HTMLElement) => void;
  floating: (node: HTMLElement) => void;
  getReferenceProps: (userProps?: HTMLProps<Element> | undefined) => Record<string, unknown>;
  getFloatingProps: (userProps?: HTMLProps<HTMLElement> | undefined) => Record<string, unknown>;
  animation?: AnimationBaseProps;
  labelId: string;
  descriptionId: string;
  onClose: () => void;
  placement: Placement;
};

const [DropdownMenuProvider, useDropdownMenu] = createContext<DropdownMenuContextValue>({
  strict: true,
  name: 'DropdownMenuContext',
});

export { DropdownMenuProvider, useDropdownMenu };
