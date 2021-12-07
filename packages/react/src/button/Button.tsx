import { ElementRef, forwardRef, ReactElement, ReactNode } from 'react';
import { __DEV__, dataAttr } from '@agile-ui/utils';
import { ComponentPropsWithoutRef, Primitive } from '../primitive/Primitive';

type ButtonElement = ElementRef<typeof Primitive.button>;
type PrimitiveButtonProps = ComponentPropsWithoutRef<typeof Primitive.button>;

export type ButtonProps = PrimitiveButtonProps & {
  type?: 'button' | 'reset' | 'submit';
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
  color?: 'gray' | 'blue' | 'green' | 'red' | 'yellow' | 'orange';
  variant?: string;
  active?: boolean;
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;
  fullWidth?: boolean;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  children: ReactNode;
};

export const Button = forwardRef<ButtonElement, ButtonProps>((props, ref) => {
  const {
    children,
    type = 'button',
    active,
    disabled = false,
    loading = false,
    loadingText,
    startIcon,
    endIcon,
    size = 'base',
    variant = 'solid',
    color = 'blue',
    className,
    ...restProps
  } = props;

  return (
    <Primitive.button
      className={className}
      disabled={disabled || loading}
      data-active={dataAttr(active)}
      data-loading={dataAttr(loading)}
      aria-disabled={disabled}
      type={type}
      ref={ref}
      {...restProps}
    >
      {startIcon && !loading ? startIcon : null}
      {children}
      {endIcon && !loading ? endIcon : null}
    </Primitive.button>
  );
});

if (__DEV__) {
  Button.displayName = 'Button';
}
