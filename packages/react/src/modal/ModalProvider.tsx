import type { FloatingContext } from '@floating-ui/react-dom-interactions';
import type { RefObject } from 'react';
import type { HTMLProps } from 'react';
import { createContext } from '../utils/context';

type ModalContextValue = {
  open: boolean;
  context: FloatingContext<HTMLElement>;
  floating: (node: HTMLElement) => void;
  getFloatingProps: (userProps?: HTMLProps<HTMLElement> | undefined) => Record<string, unknown>;
  lockScroll?: boolean;
  initialFocus?: number | RefObject<HTMLElement>;
  finalFocus?: RefObject<HTMLElement>;
  scrollBehavior?: 'inside' | 'outside';
  labelId: string;
  descriptionId: string;
  onClose: () => void;
};

const [ModalProvider, useModal] = createContext<ModalContextValue>({
  strict: true,
  name: 'ModalContext',
});

export { ModalProvider, useModal };
