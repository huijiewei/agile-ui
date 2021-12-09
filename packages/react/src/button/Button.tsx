import { ElementRef, forwardRef, ReactElement, ReactNode } from 'react';
import { __DEV__, dataAttr } from '@agile-ui/utils';
import { ComponentPropsWithoutRef, Primitive } from '../primitive/Primitive';
import { ButtonVariants, variants } from './Button.css';
import clsx from 'clsx';
import { useButtonGroup } from './ButtonGroup';

type ButtonElement = ElementRef<typeof Primitive.button>;
type PrimitiveButtonProps = ComponentPropsWithoutRef<typeof Primitive.button>;

export type ButtonProps = PrimitiveButtonProps &
  ButtonVariants & {
    type?: 'button' | 'reset' | 'submit';
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
  const group = useButtonGroup();

  const {
    children,
    type = 'button',
    active,
    disabled = group?.disabled || false,
    loading = false,
    loadingText,
    startIcon,
    endIcon,
    size = group?.size || 'md',
    level = group?.level || 'primary',
    variant = group?.variant || 'solid',
    className,
    ...restProps
  } = props;

  return (
    <Primitive.button
      className={clsx(className, variants({ size, level, variant, disabled }))}
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
