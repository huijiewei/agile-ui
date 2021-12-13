import { useMergedRef } from '@agile-ui/react-hooks';
import { __DEV__, dataAttr } from '@agile-ui/utils';
import clsx from 'clsx';
import { ElementType, ReactElement, useCallback, useState } from 'react';
import { polymorphicComponent } from '../utils/polymorphic';
import { buttonRecipes, ButtonVariants } from './Button.css';
import { useButtonGroup } from './ButtonGroup';

const useButtonType = (value?: ElementType) => {
  const [isButton, setIsButton] = useState(!value);

  const refCallback = useCallback((node: HTMLElement | null) => {
    if (!node) {
      return;
    }

    setIsButton(node.tagName === 'BUTTON');
  }, []);

  const type = isButton ? 'button' : undefined;

  return { ref: refCallback, type } as const;
};

export type ButtonProps = ButtonVariants & {
  type?: 'button' | 'reset' | 'submit';
  active?: boolean;
  loading?: boolean;
  loadingText?: string;
  fullWidth?: boolean;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
};

export const Button = polymorphicComponent<'button', ButtonProps>((props, ref) => {
  const group = useButtonGroup();

  const {
    as: Component = 'button',
    children,
    type,
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
    ...rest
  } = props;

  const { ref: _ref, type: defaultType } = useButtonType(Component);

  return (
    <Component
      {...rest}
      className={clsx(className, buttonRecipes({ size, level, variant, disabled }))}
      disabled={disabled || loading}
      data-active={dataAttr(active)}
      data-loading={dataAttr(loading)}
      aria-disabled={disabled}
      type={type ?? defaultType}
      ref={useMergedRef(ref, _ref)}
    >
      {startIcon && !loading && startIcon}
      {children}
      {endIcon && !loading && endIcon}
    </Component>
  );
});

if (__DEV__) {
  Button.displayName = 'Button';
}
