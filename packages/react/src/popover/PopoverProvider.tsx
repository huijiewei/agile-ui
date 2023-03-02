import type { FloatingContext } from '@floating-ui/react';
import type { HTMLProps, MutableRefObject } from 'react';
import { createContext } from '../utils/context';
import type { Dict } from '@agile-ui/utils';
import type { MotionPreset } from '../motion/MotionPresets';
import type { MotionProps } from 'framer-motion';

type PopoverAriaContextValue = {
  labelId: string;
  descriptionId: string;
};

const [PopoverAriaProvider, usePopoverAria] = createContext<PopoverAriaContextValue>({
  strict: true,
  name: 'PopoverAriaContext',
});

export { PopoverAriaProvider, usePopoverAria };

type PopoverDispatchContextValue = {
  handleClose: () => void;
};

const [PopoverDispatchProvider, usePopoverDispatch] = createContext<PopoverDispatchContextValue>({
  strict: true,
  name: 'PopoverDispatchContext',
});

export { PopoverDispatchProvider, usePopoverDispatch };

type PopoverReferenceContextValue = {
  open: boolean;
  setReference: (node: HTMLElement) => void;
  getReferenceProps: (userProps?: HTMLProps<Element> | undefined) => Dict<unknown>;
};

const [PopoverReferenceProvider, usePopoverReference] = createContext<PopoverReferenceContextValue>({
  strict: true,
  name: 'PopoverReferenceContext',
});

export { PopoverReferenceProvider, usePopoverReference };

type PopoverFloatingContextValue = {
  x: number | null;
  y: number | null;
  open: boolean;
  context: FloatingContext;

  setFloating: (node: HTMLElement) => void;
  getFloatingProps: (userProps?: HTMLProps<HTMLElement> | undefined) => Dict<unknown>;

  modal: boolean;
  initialFocus?: number | MutableRefObject<HTMLElement | null>;

  motionPreset: MotionPreset;
  motionProps?: MotionProps;
};

const [PopoverFloatingProvider, usePopoverFloating] = createContext<PopoverFloatingContextValue>({
  strict: true,
  name: 'PopoverFloatingContext',
});

export { PopoverFloatingProvider, usePopoverFloating };
