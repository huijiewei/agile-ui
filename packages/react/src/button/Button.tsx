import { useMergedRefs } from '@agile-ui/react-hooks';
import { __DEV__ } from '@agile-ui/utils';
import { ElementType, ReactNode, useCallback, useState } from 'react';
import { tx } from 'twind';
import { polymorphicComponent } from '../utils/polymorphic';
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
   * 类型
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
   */
  loadingText?: string;

  /**
   * 是否全宽度
   * @default false
   */
  fullWidth?: boolean;

  /**
   * 加载器
   */
  spinner?: ReactNode;

  /**
   * 加载器位置
   * @default 'start'
   */
  spinnerPlacement?: 'start' | 'end';
};

const buttonSizes = {
  xs: 'h-6 px-2 text-sm',
  sm: 'h-7 px-2',
  md: 'h-8 px-3',
  lg: 'h-9 px-5',
  xl: 'h-10 px-5 text-lg',
};

const buttonVariants = (color: string, disabled: boolean, active: boolean) => {
  return {
    solid: [
      `text-white dark:text-black border-transparent`,
      active ? `bg-${color}-800` : `bg-${color}-600`,
      !disabled && !active && `hover:bg-${color}-700 active:bg-${color}-800`,
    ],
    outline: [
      `border-current text-${color}-600`,
      active ? `bg-${color}-100` : `bg-white dark:bg-black `,
      !disabled && !active && `hover:bg-${color}-50 active:bg-${color}-100`,
    ],
    light: [
      `border-transparent text-${color}-700`,
      active ? `bg-${color}-200` : `bg-${color}-50`,
      !disabled && !active && `hover:bg-${color}-100 active:bg-${color}-200`,
    ],
    subtle: [
      `border-transparent text-${color}-700`,
      active ? `bg-${color}-200` : ``,
      !disabled && !active && `hover:bg-${color}-100 active:bg-${color}-200`,
    ],
    link: [
      `border-transparent underline underline-offset-2`,
      active ? `text-${color}-900` : `text-${color}-600`,
      !disabled && !active && ` hover:text-${color}-900 active:text-${color}-900`,
    ],
  };
};

/**
 * 按钮.
 */
export const Button = polymorphicComponent<'button', ButtonProps>((props, ref) => {
  const group = useButtonGroup();

  const {
    as: Component = 'button',
    children,
    type,
    active = false,
    disabled = group?.disabled || false,
    loading = false,
    loadingText,
    spinner,
    spinnerPlacement = 'start',
    size = group?.size || 'md',
    color = group?.color || 'blue',
    variant = group?.variant || 'solid',
    fullWidth = false,
    className,
    ...rest
  } = props;

  const { ref: _ref, type: defaultType } = useButtonType(Component);

  return (
    <Component
      {...rest}
      className={tx(
        'inline-flex select-none appearance-none items-center justify-center whitespace-nowrap rounded border align-middle transition-colors',
        fullWidth ? 'w-full' : 'w-auto',
        disabled && 'cursor-not-allowed opacity-60',
        buttonSizes[size],
        buttonVariants(color, disabled || loading, active)[variant],
        className
      )}
      disabled={disabled || loading}
      type={type ?? defaultType}
      ref={useMergedRefs(ref, _ref)}
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
    </Component>
  );
});

if (__DEV__) {
  Button.displayName = 'Button';
}
