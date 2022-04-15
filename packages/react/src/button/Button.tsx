import { useMergedRef } from '@agile-ui/react-hooks';
import { __DEV__, dataAttr } from '@agile-ui/utils';
import clsx from 'clsx';
import { ElementType, ReactElement, useCallback, useState } from 'react';
import { Box } from '../box/Box';
import { polymorphicComponent } from '../utils/polymorphic';
import { ButtonGroupProps, useButtonGroup } from './ButtonGroup';

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

export type ButtonProps = ButtonGroupProps & {
  type?: 'submit' | 'reset' | 'button';
  active?: boolean;
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;
  fullWidth?: boolean;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
};

export const ButtonStyles = {
  base: 'inline-block rounded focus:outline-none focus:ring focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed',
  xs: 'px-2 py-0.5 text-sm',
  sm: 'px-3 py-0.5 text-base',
  md: 'px-4 py-1 text-base',
  lg: 'px-5 py-1.5 text-base',
  xl: 'px-5 py-1.5 text-lg',
  primary: 'text-white bg-blue-600 hover:bg-blue-700 ring-blue-200',
  success: 'text-white bg-green-600 hover:bg-green-700 ring-green-200',
  warning: 'text-white bg-yellow-600 hover:bg-yellow-700 ring-yellow-200',
  danger: 'text-white bg-red-600 hover:bg-red-700 ring-red-200',
  fullWidth: 'w-full',
};

export const Button = polymorphicComponent<'button', ButtonProps>((props, ref) => {
  const group = useButtonGroup();

  const {
    as = 'button',
    children,
    type,
    active,
    disabled = false,
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

  const { ref: _ref, type: defaultType } = useButtonType(as);

  return (
    <Box
      as={as}
      {...rest}
      className={clsx(className, ButtonStyles.base, ButtonStyles[size], ButtonStyles[level], ButtonStyles[variant])}
      disabled={disabled || loading}
      data-active={dataAttr(active)}
      data-loading={dataAttr(loading)}
      type={type ?? defaultType}
      ref={useMergedRef(ref, _ref)}
    >
      {startIcon && !loading && startIcon}
      {children}
      {endIcon && !loading && endIcon}
    </Box>
  );
});

if (__DEV__) {
  Button.displayName = '@agile-ui/react/Button';
}
