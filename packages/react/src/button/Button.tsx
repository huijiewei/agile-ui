import { useMergedRef } from '@agile-ui/react-hooks';
import { __DEV__ } from '@agile-ui/utils';
import { ElementType, ReactNode, useCallback, useState } from 'react';
import { Box } from '../box/Box';
import { polymorphicComponent } from '../utils/polymorphic';
import { twClsx } from '../utils/tailwind';
import { ButtonBaseProps, useButtonGroup } from './ButtonGroup';
import { ButtonSpinner } from './ButtonSpinner';

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

export type ButtonProps = ButtonBaseProps & {
  /**
   * 类型.
   * @default 'button'
   */
  type?: 'submit' | 'reset' | 'button';

  /**
   * 是否激活
   * @default false
   */
  active?: boolean;

  /**
   * 是否加载中
   * @default false
   */
  loading?: boolean;

  /**
   * 加载文本
   * @default ''
   */
  loadingText?: string;

  /**
   * 是否全宽度
   * @default false
   */
  fullWidth?: boolean;

  spinner?: ReactNode;
  spinnerPlacement?: 'start' | 'end';
};

const ButtonStyles = {
  base: 'inline-flex align-middle items-center w-auto transition-colors justify-center whitespace-nowrap select-none appearance-none border rounded disabled:opacity-50 disabled:cursor-not-allowed',
  sizes: {
    xs: 'h-6 px-2 text-sm',
    sm: 'h-7 px-2',
    md: 'h-8 px-3',
    lg: 'h-9 px-5',
    xl: 'h-10 px-5 text-lg',
  },
  variants: {
    solid: {
      base: 'text-white border-transparent',
      primary: { base: '', normal: 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800', active: 'bg-blue-800' },
      success: { base: '', normal: 'bg-green-600 hover:bg-green-700 active:bg-green-800', active: 'bg-green-800' },
      warning: { base: '', normal: 'bg-yellow-600 hover:bg-yellow-700 active:bg-yellow-800', active: 'bg-yellow-800' },
      danger: { base: '', normal: 'bg-red-600 hover:bg-red-700 active:bg-red-800', active: 'bg-red-800' },
      natural: { base: '', normal: 'bg-gray-800 hover:bg-gray-900 active:bg-black', active: 'bg-black' },
    },
    outline: {
      base: 'bg-white border-current',
      primary: { base: 'text-blue-600', normal: 'hover:bg-blue-50 active:bg-blue-100', active: 'bg-blue-100' },
      success: { base: 'text-green-600', normal: 'hover:bg-green-50 active:bg-green-100', active: 'bg-green-100' },
      warning: { base: 'text-yellow-600 ', normal: 'hover:bg-yellow-50 active:bg-yellow-100', active: 'bg-yellow-100' },
      danger: { base: 'text-red-600', normal: 'hover:bg-red-50 active:bg-red-100', active: 'bg-red-100' },
      natural: { base: 'text-gray-900', normal: 'hover:bg-gray-50 active:bg-gray-100', active: 'bg-gray-100' },
    },
    light: {
      base: 'border-transparent',
      primary: {
        base: 'text-blue-600',
        normal: 'bg-blue-50 hover:bg-blue-100 active:bg-blue-200',
        active: 'bg-blue-200',
      },
      success: {
        base: 'text-green-600',
        normal: 'bg-green-50 hover:bg-green-100 active:bg-green-200',
        active: 'bg-green-200',
      },
      warning: {
        base: 'text-yellow-600',
        normal: 'bg-yellow-50 hover:bg-yellow-100 active:bg-yellow-200',
        active: 'bg-blue-100',
      },
      danger: { base: 'text-red-600', normal: 'bg-red-50 hover:bg-red-100 active:bg-red-200', active: 'bg-red-200' },
      natural: {
        base: 'text-gray-900',
        normal: 'bg-gray-50 hover:bg-gray-100 active:bg-gray-200',
        active: 'bg-blue-100',
      },
    },
    subtle: {
      base: 'border-transparent bg-white',
      primary: { base: 'text-blue-600', normal: 'hover:bg-blue-50 active:bg-blue-100', active: 'bg-blue-100' },
      success: { base: 'text-green-600', normal: 'hover:bg-green-50 active:bg-green-100', active: 'bg-green-100' },
      warning: { base: 'text-yellow-600', normal: 'hover:bg-yellow-50 active:bg-yellow-100', active: 'bg-yellow-100' },
      danger: { base: 'text-red-600', normal: 'hover:bg-red-50 active:bg-red-100', active: 'bg-red-100' },
      natural: { base: 'text-gray-900', normal: 'hover:bg-gray-50 active:bg-gray-100', active: 'bg-gray-100' },
    },
    link: {
      base: 'border-transparent bg-white underline underline-offset-2',
      primary: { base: '', normal: 'text-blue-600 hover:text-blue-800 active:text-blue-900', active: 'text-blue-900' },
      success: {
        base: '',
        normal: 'text-green-600 hover:text-green-800 active:text-green-900',
        active: 'text-green-900',
      },
      warning: {
        base: '',
        normal: 'text-yellow-600 hover:text-yellow-800 active:text-yellow-900',
        active: 'text-yellow-900',
      },
      danger: { base: '', normal: 'text-red-600 hover:text-red-800 active:text-red-900', active: 'text-red-900' },
      natural: { base: '', normal: 'text-gray-800 hover:text-gray-900 active:text-black', active: 'text-black' },
    },
  },
  fullWidth: 'w-full',
};

/**
 * 按钮.
 */
export const Button = polymorphicComponent<'button', ButtonProps>((props, ref) => {
  const group = useButtonGroup();

  const {
    as = 'button',
    children,
    type = 'button',
    active = false,
    disabled = group?.disabled || false,
    loading = false,
    loadingText,
    spinner,
    spinnerPlacement = 'start',
    size = group?.size || 'md',
    color = group?.color || 'primary',
    variant = group?.variant || 'solid',
    fullWidth = false,
    className,
    ...rest
  } = props;

  const { ref: _ref, type: defaultType } = useButtonType(as);

  return (
    <Box
      as={as}
      {...rest}
      className={twClsx(
        ButtonStyles.base,
        ButtonStyles.sizes[size],
        ButtonStyles.variants[variant].base,
        ButtonStyles.variants[variant][color].base,
        active ? ButtonStyles.variants[variant][color].active : ButtonStyles.variants[variant][color].normal,
        fullWidth && ButtonStyles.fullWidth,
        className
      )}
      disabled={disabled || loading}
      type={type ?? defaultType}
      ref={useMergedRef(ref, _ref)}
    >
      {loading && spinnerPlacement === 'start' && (
        <ButtonSpinner size={size} label={loadingText} placement="start">
          {spinner}
        </ButtonSpinner>
      )}

      {loading ? loadingText || <span className={'opacity-0'}>{children}</span> : children}

      {loading && spinnerPlacement === 'end' && (
        <ButtonSpinner size={size} label={loadingText} placement="end">
          {spinner}
        </ButtonSpinner>
      )}
    </Box>
  );
});

if (__DEV__) {
  Button.displayName = 'Button';
}
