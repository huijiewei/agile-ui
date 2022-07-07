import type { ToastProps } from './Toast';

export type ToastPosition = 'top-left' | 'top' | 'top-right' | 'bottom-left' | 'bottom' | 'bottom-right';

export type ToastId = string | number;

export type ToastOptions = ToastProps & {
  id: ToastId;

  duration: number | null;
  position: ToastPosition;
  remove: boolean;
  onRemove?: () => void;
};

export type ToastState = {
  [K in ToastPosition]: ToastOptions[];
};
