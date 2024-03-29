import { isNumber, MaybeFunction, runIfFn } from '@agile-ui/utils';
import type { PropsWithChildren } from 'react';
import { useMemo, useState } from 'react';
import { cx } from '@twind/core';
import { Portal } from '../portal/Portal';
import { createContext } from '../utils/context';
import type { ToastId, ToastProps } from './Toast';
import { ToastContainer } from './ToastContainer';

export type ToastPosition = 'top-left' | 'top' | 'top-right' | 'bottom-left' | 'bottom' | 'bottom-right';

export type ToastOptions = ToastProps & {
  /**
   * 自动关闭延迟, 设置为 `null` 不会自动关闭.
   * @default 5000
   */
  duration: number | null;

  /**
   * 显示位置
   * @default 'bottom'
   */
  position?: ToastPosition;

  remove: boolean;

  onRemove?: () => void;
};

type ToastState = {
  [K in ToastPosition]: Omit<ToastOptions, 'position'>[];
};

type ToastCreateOptions = Partial<ToastOptions>;
type ToastUpdateOptions = Omit<ToastCreateOptions, 'id' | 'position' | 'remove' | 'onRemove'>;

type ToastDispatchContextValue = {
  notify: (options: ToastCreateOptions) => ToastId;
  update: (id: ToastId, options: ToastUpdateOptions) => void;
  promise: <T = unknown, E extends Error = Error>(
    promise: MaybeFunction<Promise<T>>,
    options: {
      pending: ToastCreateOptions;
      success: MaybeFunction<ToastUpdateOptions, [T]>;
      error: MaybeFunction<ToastUpdateOptions, [E]>;
    }
  ) => void;
  close: (id: ToastId) => void;
  clean: (options?: { positions?: ToastPosition[] }) => void;
};

export type ToastProviderProps = {
  spacing?: string | null;
};

const [ToastDispatchProvider, useToastDispatch] = createContext<ToastDispatchContextValue>({
  name: 'ToastDispatchContext',
  strict: true,
});

export { useToastDispatch };

export const ToastProvider = (props: PropsWithChildren<ToastProviderProps>) => {
  const { children, spacing = 3 } = props;

  const [state, setState] = useState<ToastState>({
    'top-left': [],
    top: [],
    'top-right': [],
    'bottom-left': [],
    bottom: [],
    'bottom-right': [],
  });

  const value = useMemo(() => {
    const notify: ToastDispatchContextValue['notify'] = (options) => {
      const toastId = options.id || (`toast-${Math.random().toString(36).slice(2, 9)}` as ToastId);

      const { position = 'bottom', ...toast } = options;

      toast.id = toastId;

      toast.onRemove = () => {
        setState((prevState) => ({
          ...prevState,
          [position]: prevState[position].filter((toast) => toast.id != toastId),
        }));
      };

      setState((prevToasts) => {
        const toasts = position.includes('top')
          ? [toast, ...(prevToasts[position] || [])]
          : [...(prevToasts[position] || []), toast];

        return {
          ...prevToasts,
          [position]: toasts,
        };
      });

      return toastId;
    };

    const update: ToastDispatchContextValue['update'] = (id, options) => {
      if (!id) return;

      setState((prevState) => {
        const nextState = { ...prevState };
        const { position, index } = findToast(nextState, id);

        if (position && index !== -1) {
          nextState[position][index] = {
            ...nextState[position][index],
            ...options,
          };
        }

        return nextState;
      });
    };

    const promise: ToastDispatchContextValue['promise'] = (promise, options) => {
      const toastId = notify({ ...options.pending, duration: null, closeable: false });

      runIfFn(promise)
        .then((data) => {
          update(toastId, { duration: 5000, closeable: true, ...runIfFn(options.success, data) });
        })
        .catch((error) => {
          update(toastId, { duration: 5000, closeable: true, ...runIfFn(options.error, error) });
        });
    };

    const close: ToastDispatchContextValue['close'] = (id) => {
      setState((prevState) => {
        const position = getToastPosition(prevState, id);

        if (!position) return prevState;

        return {
          ...prevState,
          [position]: prevState[position].map((toast) => {
            if (toast.id == id) {
              return {
                ...toast,
                remove: true,
              };
            }

            return toast;
          }),
        };
      });
    };

    const clean: ToastDispatchContextValue['clean'] = (options?) => {
      setState((prev) => {
        const positions = options?.positions || [
          'bottom',
          'bottom-right',
          'bottom-left',
          'top',
          'top-left',
          'top-right',
        ];

        return positions.reduce(
          (acc, position) => {
            acc[position] = prev[position].map((toast) => ({
              ...toast,
              remove: true,
            }));

            return acc;
          },
          { ...prev } as ToastState
        );
      });
    };

    return { notify, update, promise, close, clean };
  }, []);

  return (
    <ToastDispatchProvider value={value}>
      {children}
      <Portal>
        {Object.keys(state).map((position) => {
          const toastPosition = position as ToastPosition;
          const toasts = state[toastPosition];

          if (toasts.length == 0) {
            return null;
          }

          return (
            <ul
              role="region"
              aria-live="polite"
              className={cx(
                'pointer-events-none fixed z-50 flex flex-col',
                isNumber(spacing) ? `gap-${spacing} m-${spacing}` : `gap-[${spacing}] m-[${spacing}]`,
                getToastListStyles(toastPosition)
              )}
              key={position}
              id={`toast-${position}`}
            >
              {toasts.map((toast) => (
                <ToastContainer key={toast.id} {...toast} />
              ))}
            </ul>
          );
        })}
      </Portal>
    </ToastDispatchProvider>
  );
};

ToastProvider.displayName = 'ToastProvider';

const getToastListStyles = (position: ToastPosition) => {
  const styles = [];

  if (position.includes('top')) {
    styles.push('top-0');
  }

  if (position.includes('bottom')) {
    styles.push('bottom-0');
  }

  if (!position.includes('left')) {
    styles.push('right-0');
  }

  if (!position.includes('right')) {
    styles.push('left-0');
  }

  return styles;
};

const findToast = (toasts: ToastState, id: ToastId) => {
  const position = getToastPosition(toasts, id);

  const index = position ? toasts[position].findIndex((toast) => toast.id === id) : -1;

  return {
    position,
    index,
  };
};

const getToastPosition = (toasts: ToastState, id: ToastId) => {
  return Object.keys(toasts).find((key) => {
    return (
      toasts[key as ToastPosition].findIndex((toast) => {
        return toast.id == id;
      }) > -1
    );
  }) as ToastPosition;
};
