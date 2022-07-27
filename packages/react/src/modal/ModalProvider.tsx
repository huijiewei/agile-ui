import type { FloatingContext } from '@floating-ui/react-dom-interactions';
import type { MutableRefObject } from 'react';
import type { HTMLProps } from 'react';
import { createContext } from '../utils/context';

type ModalContextValue = {
  open: boolean;
  context: FloatingContext<HTMLElement>;
  floating: (node: HTMLElement) => void;
  getFloatingProps: (userProps?: HTMLProps<HTMLElement> | undefined) => Record<string, unknown>;
  lockScroll?: boolean;
  initialFocus?: number | MutableRefObject<HTMLElement | null>;
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
