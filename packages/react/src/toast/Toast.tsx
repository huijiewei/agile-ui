import type { ReactElement, ReactNode } from 'react';
import { cx } from 'twind';
import { Alert, AlertDescription, AlertIcon, AlertTitle } from '../alert/Alert';
import { CloseButton } from '../close-button/CloseButton';
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
   * @type ReactElement
   */
  icon?: ReactElement;

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
   * 关闭通知的回调
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
      {icon && <AlertIcon>{icon}</AlertIcon>}
      <div className={'flex-1 max-w-full'}>
        {title && <AlertTitle id={titleId}>{title}</AlertTitle>}
        <AlertDescription>{description}</AlertDescription>
      </div>
      {closeable && (
        <CloseButton
          onClick={onClose}
          className={cx(
            'absolute top-1 right-1 p-0.5 rounded',
            variant == 'solid' ? `hover:bg-${color}-600` : `hover:bg-${color}-200 text-black`
          )}
        />
      )}
    </Alert>
  );
});

Toast.displayName = 'Toast';
