import { forwardRef, ReactElement, ReactNode } from 'react';
import { __DEV__, dataAttr } from '@agile-ui/utils';
import { PolymorphicComponent, Primitive } from '../primitive/Primitive';
import { ButtonVariants, variants } from './Button.css';
import clsx from 'clsx';
import { useButtonGroup } from './ButtonGroup';

const DEFAULT_TAG = 'button';

export type ButtonOwnProps = ButtonVariants & {
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

export const Button: PolymorphicComponent<ButtonOwnProps, typeof DEFAULT_TAG> = forwardRef((props, ref) => {
  const group = useButtonGroup();

  const {
    as = DEFAULT_TAG,
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
    <Primitive
      as={as}
      className={clsx(className, variants({ size, level, variant, disabled }))}
      disabled={disabled || loading}
      data-active={dataAttr(active)}
      data-loading={dataAttr(loading)}
      aria-disabled={disabled}
      type={type}
      ref={ref}
      {...restProps}
    >
      {startIcon && !loading && startIcon}
      {children}
      {endIcon && !loading && endIcon}
    </Primitive>
  );
});

if (__DEV__) {
  Button.displayName = 'Button';
}
