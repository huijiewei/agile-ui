import { useMergedRefs } from '@agile-ui/react-hooks';
import { dataAttr, isNumber } from '@agile-ui/utils';
import { ElementType, ReactNode, useCallback, useState } from 'react';
import { cx } from '@twind/core';
import { polymorphicComponent } from '../utils/component';
import type { NumberSize } from '../utils/types';
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
   * 边框圆角
   * @default 'md'
   */
  radius?: NumberSize;

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
  xs: 'h-6 px-3 text-sm',
  sm: 'h-7 px-4',
  md: 'h-8 px-5',
  lg: 'h-9 px-6',
  xl: 'h-10 px-7 text-lg',
};

const buttonVariants = (color: string, group?: { vertical: boolean }) => {
  return {
    solid: [
      `text-white border-transparent bg-${color}-500 disabled:bg-${color}-500 hover:bg-${color}-600 active:bg-${color}-700`,
      group && `not-last-child:(border-${group.vertical ? 'b' : 'r'}-current)`,
    ],
    outline: [
      `border-current text-${color}-500 bg-white disabled:bg-white hover:bg-${color}-50 active:bg-${color}-100`,
      group && `not-first-child:(-m${group.vertical ? 't' : 'l'}-[1px])`,
    ],
    light: [
      `border-transparent text-${color}-500 bg-${color}-50 disabled:bg-${color}-50 hover:bg-${color}-100 active:bg-${color}-200`,
      group && `not-last-child:(border-${group.vertical ? 'b' : 'r'}-${color}-100)`,
    ],
    subtle: [
      `border-transparent text-${color}-500 bg-transparent disabled:bg-transparent hover:bg-${color}-100 active:bg-${color}-200`,
    ],
    link: [
      `border-transparent underline underline-offset-2 text-${color}-500 disabled:text-${color}-500 hover:text-${color}-600 active:text-${color}-700`,
    ],
  };
};

/**
 * 按钮
 */
export const Button = polymorphicComponent<'button', ButtonProps>((props, ref) => {
  const group = useButtonGroup();

  const {
    as: Component = 'button',
    children,
    type,
    radius,
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

  const rounded = radius ? (isNumber(radius) ? `-[${radius}px]` : `-${radius}`) : '';

  const { ref: _ref, type: defaultType } = useButtonType(Component);

  return (
    <Component
      className={cx(
        'inline-flex items-center justify-center ',
        'select-none appearance-none outline-none',
        'whitespace-nowrap border transition-colors',
        'disabled:(cursor-not-allowed opacity-50)',
        `focus-visible:(ring ring-${color}-300)`,
        group
          ? `first:(${
              group.vertical ? `rounded-tl${rounded} rounded-tr${rounded}` : `rounded-tl${rounded} rounded-bl${rounded}`
            }) last:(${
              group.vertical ? `rounded-bl${rounded} rounded-br${rounded}` : `rounded-tr${rounded} rounded-br${rounded}`
            })`
          : `rounded${rounded}`,
        fullWidth ? 'w-full' : 'w-auto',
        buttonSizes[size],
        buttonVariants(color, group && { vertical: group.vertical || false })[variant],
        className
      )}
      data-active={dataAttr(active)}
      disabled={disabled || loading}
      type={type || defaultType}
      ref={useMergedRefs(ref, _ref)}
      {...rest}
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

Button.displayName = 'Button';
