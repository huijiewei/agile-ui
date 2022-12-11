import type { FloatingContext } from '@floating-ui/react';
import type { RefObject } from 'react';
import type { HTMLProps } from 'react';
import { createContext } from '../utils/context';
import type { Dict } from '@agile-ui/utils';

type ModalContextValue = {
  open: boolean;
  context: FloatingContext<HTMLElement>;
  floating: (node: HTMLElement) => void;
  getFloatingProps: (userProps?: HTMLProps<HTMLElement> | undefined) => Dict<unknown>;
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
