import { __DEV__ } from '@agile-ui/utils';
import { ToastOptions, useToastContext } from './ToastProvider';

export type UseToastOptions = Omit<ToastOptions, 'remove' | 'onRemove'>;

export const useToast = (defaultOptions?: UseToastOptions) => {
  const context = useToastContext();

  const toast = (options: UseToastOptions) => {
    return context.notify({
      ...defaultOptions,
      ...options,
    });
  };

  toast.update = context.update;
  toast.promise = context.promise;
  toast.close = context.close;
  toast.clean = context.clean;

  return toast;
};

if (__DEV__) {
  useToast.displayName = 'useToast';
}
