import type { FloatingContext, Placement } from '@floating-ui/react-dom-interactions';
import type { HTMLProps, MutableRefObject } from 'react';
import type { AnimationBaseProps } from '../animation/Animation';
import { createContext } from '../utils/context';

type PopoverContextValue = {
  x: number | null;
  y: number | null;
  open: boolean;
  context: FloatingContext<HTMLElement>;
  floating: (node: HTMLElement) => void;
  getFloatingProps: (userProps?: HTMLProps<HTMLElement> | undefined) => Record<string, unknown>;
  animation: Required<AnimationBaseProps>;
  modal: boolean;
  initialFocus?: number | MutableRefObject<HTMLElement | null>;

  reference: (node: HTMLElement) => void;
  getReferenceProps: (userProps?: HTMLProps<Element> | undefined) => Record<string, unknown>;

  labelId: string;
  descriptionId: string;

  handleClose: () => void;

  placement: Placement;
};

const [PopoverProvider, usePopover] = createContext<PopoverContextValue>({
  strict: true,
  name: 'PopoverContext',
});

export { PopoverProvider, usePopover };
