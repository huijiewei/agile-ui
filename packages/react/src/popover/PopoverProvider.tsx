import type { FloatingContext } from '@floating-ui/react-dom-interactions';
import type { MutableRefObject } from 'react';
import type { HTMLProps } from 'react';
import type { AnimationBaseProps } from '../animation/Animation';
import { createContext } from '../utils/context';

type PopoverContextValue = {
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
  modal: boolean;
  initialFocus?: number | MutableRefObject<HTMLElement | null>;
};

const [PopoverProvider, usePopover] = createContext<PopoverContextValue>({
  strict: true,
  name: 'PopoverContext',
});

export { PopoverProvider, usePopover };
