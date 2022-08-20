import type { ReactNode } from 'react';
import type { ToastProviderProps } from '../toast/ToastProvider';
import { ToastProvider } from '../toast/ToastProvider';
import { ColorModeProvider, useColorModeDispatch, useColorModeState } from './ColorModeProvider';

export type AgileProviderProps = {
  children?: ReactNode;
  toastOptions?: ToastProviderProps;
};

export { useColorModeState, useColorModeDispatch };

export const AgileProvider = ({ children, toastOptions }: AgileProviderProps) => {
  return (
    <ColorModeProvider>
      <ToastProvider {...toastOptions}>{children}</ToastProvider>
    </ColorModeProvider>
  );
};
