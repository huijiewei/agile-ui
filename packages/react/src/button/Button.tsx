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
  base: 'inline-block text-base rounded px-5 py-1 focus:outline-none focus:ring focus:ring-opacity-50',
  animate: 'transition duration-300 ease-in-out',
  xs: 'px-3 py-1',
  sm: 'px-4 py-1',
  primary: 'text-white bg-blue-600 hover:bg-blue-600 ring-blue-200',
  success: 'text-white bg-green-600 hover:bg-green-600 ring-green-200',
  warn: 'text-white bg-yellow-600 hover:bg-yellow-600 ring-yellow-200',
  danger: 'text-white bg-red-600 hover:bg-red-600 ring-red-200',
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
      className={clsx(
        className,
        ButtonStyles.base,
        ButtonStyles.animate,
        ButtonStyles[size],
        ButtonStyles[level],
        ButtonStyles[variant]
      )}
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
  Button.displayName = 'Button';
}
