import type { ToastProps } from './Toast';
import { useToastContext } from './ToastProvider';
import type { ToastId, ToastPosition } from './ToastTypes';

export type UseToastOptions = ToastProps & {
  /**
   * 显示位置
   * @default false
   */
  position?: ToastPosition;

  /**
   * 自动关闭延迟
   * 如果设置为 `null`, 通知将不会自动关闭.
   * @default 5000
   */
  duration?: number | null;
};
export const useToast = (defaultOptions?: UseToastOptions) => {
  const normalizeToastOptions = (options?: UseToastOptions) => ({
    ...defaultOptions,
    ...options,
  });

  const context = useToastContext();

  const toast = (options: UseToastOptions) => {
    return context.notify(normalizeToastOptions(options));
  };

  toast.update = (id: ToastId, options: Omit<UseToastOptions, 'id'>) => {
    context.update(id, normalizeToastOptions(options));
  };

  toast.close = context.close;
  toast.clean = context.clean;

  return toast;
};
