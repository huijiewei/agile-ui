import { __DEV__ } from '@agile-ui/utils';
import type { ReactNode } from 'react';
import { cloneElement } from 'react';
import { cx } from 'twind';
import { Alert, AlertDescription, AlertIcon, AlertTitle } from '../alert/Alert';
import { primitiveComponent } from '../utils/component';
import type { ScaleColor } from '../utils/types';

export type ToastId = string | number;

export type ToastProps = {
  /**
   * Id
   */

  id?: ToastId;

  /**
   * 图标
   */
  icon?: JSX.Element;

  /**
   * 标题
   */
  title?: ReactNode;

  /**
   * 内容
   */
  description?: ReactNode;

  /**
   * 样式
   * @default 'light'
   */
  variant?: 'solid' | 'light' | 'outline';

  /**
   * 颜色
   * @default 'blue'
   */
  color?: ScaleColor;

  /**
   * 显示关闭按钮
   * @default false
   */
  closeable?: boolean;

  /**
   * 关闭
   */
  onClose?: () => void;
};

export const Toast = primitiveComponent<'div', ToastProps>((props, ref) => {
  const {
    id,
    icon,
    title,
    color = 'blue',
    variant = 'light',
    closeable = true,
    onClose,
    description,
    className,
    ...rest
  } = props;

  const titleId = typeof id !== 'undefined' ? `${id}-title` : undefined;

  return (
    <Alert
      id={String(id)}
      ref={ref}
      className={cx('w-auto max-w-lg min-w-[20em] shadow-lg pr-8', className)}
      color={color}
      variant={variant}
      aria-labelledby={titleId}
      {...rest}
    >
      {icon && <AlertIcon>{cloneElement(icon, { size: 5 })}</AlertIcon>}
      <div className={'flex-1 max-w-full'}>
        {title && <AlertTitle id={titleId}>{title}</AlertTitle>}
        <AlertDescription>{description}</AlertDescription>
      </div>
      {closeable && (
        <button
          onClick={onClose}
          className={cx(
            'absolute top-1 right-1 p-0.5 rounded',
            variant == 'solid' ? `hover:bg-${color}-700` : `hover:bg-${color}-100 text-black`
          )}
        >
          <svg
            className={'h-4 w-4'}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </Alert>
  );
});

if (__DEV__) {
  Toast.displayName = 'Toast';
}
