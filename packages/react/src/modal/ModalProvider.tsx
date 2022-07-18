import type { FloatingContext } from '@floating-ui/react-dom-interactions';
import type { HTMLProps } from 'react';
import type { AnimationBaseProps } from '../animation/Animation';
import { createContext } from '../utils/context';

type ModalContextValue = {
  open: boolean;
  context: FloatingContext<HTMLElement>;
  floating: (node: HTMLElement) => void;
  getFloatingProps: (userProps?: HTMLProps<HTMLElement> | undefined) => Record<string, unknown>;
  animation?: AnimationBaseProps;
  lockScroll?: boolean;
  labelId: string;
  descriptionId: string;
  onClose: () => void;
};

const [ModalProvider, useModal] = createContext<ModalContextValue>({
  strict: true,
  name: 'ModalContext',
});

export { ModalProvider, useModal };
