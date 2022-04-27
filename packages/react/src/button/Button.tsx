import { useMergedRef } from '@agile-ui/react-hooks';
import { __DEV__, dataAttr } from '@agile-ui/utils';
import clsx from 'clsx';
import { ElementType, PropsWithChildren, ReactNode, useCallback, useState } from 'react';
import { Box } from '../box/Box';
import { polymorphicComponent } from '../utils/polymorphic';
import { ButtonBaseProps, useButtonGroup } from './ButtonGroup';
import { ButtonIcon } from './ButtonIcon';

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
  loadingText?: string;

  /**
   * 是否全宽度
   * @default false
   */
  fullWidth?: boolean;

  /**
   * 内部开始图标
   */
  startIcon?: ReactNode;

  /**
   * 内部结束图标
   */
  endIcon?: ReactNode;
};

type ButtonContentProps = Pick<ButtonProps, 'startIcon' | 'endIcon'>;

const ButtonStyles = {
  base: 'inline-flex align-middle items-center justify-center whitespace-nowrap select-none rounded focus:ring focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed border',
  sizes: {
    xs: 'h-6 px-2 text-sm',
    sm: 'h-7 px-2 text-base',
    md: 'h-8 px-3 text-base',
    lg: 'h-9 px-5 text-base',
    xl: 'h-10 px-5 text-lg',
  },
  levels: {
    primary: 'ring-blue-200',
    success: 'ring-green-200',
    warning: 'ring-yellow-200',
    danger: 'ring-red-200',
    natural: 'ring-gray-200',
  },
  variants: {
    solid: {
      base: 'text-white border-transparent',
      primary: 'bg-blue-600 hover:bg-blue-700',
      success: 'bg-green-600 hover:bg-green-700',
      warning: 'bg-yellow-600 hover:bg-yellow-700',
      danger: 'bg-red-600 hover:bg-red-700',
      natural: 'bg-gray-800 hover:bg-gray-900',
    },
    outline: {
      base: 'bg-white border-current',
      primary: 'text-blue-600 hover:bg-blue-50',
      success: 'text-green-600 hover:bg-green-50',
      warning: 'text-yellow-600 hover:bg-yellow-50',
      danger: 'text-red-600 hover:bg-red-50',
      natural: 'text-gray-900 hover:bg-gray-50',
    },
    light: {
      base: 'border-transparent',
      primary: 'text-blue-600 bg-blue-50 hover:bg-blue-100',
      success: 'text-green-600 bg-green-50 hover:bg-green-100',
      warning: 'text-yellow-600 bg-yellow-50 hover:bg-yellow-100',
      danger: 'text-red-600 bg-red-50 hover:bg-red-100',
      natural: 'text-gray-900 bg-gray-50 hover:bg-gray-100',
    },
    subtle: {
      base: 'border-transparent bg-white',
      primary: 'text-blue-600 hover:bg-blue-50',
      success: 'text-green-600 hover:bg-green-50',
      warning: 'text-yellow-600 hover:bg-yellow-50',
      danger: 'text-red-600 hover:bg-red-50',
      natural: 'text-gray-900 hover:bg-gray-50',
    },
    link: {
      base: 'border-transparent bg-white underline underline-offset-2',
      primary: 'text-blue-600 hover:text-blue-900',
      success: 'text-green-600 hover:text-green-900',
      warning: 'text-yellow-600 hover:text-yellow-900',
      danger: 'text-red-600 hover:text-red-900',
      natural: 'text-gray-800 hover:text-black',
    },
  },
  fullWidth: 'w-full',
};

const ButtonContent = ({ startIcon, endIcon, children }: PropsWithChildren<ButtonContentProps>) => {
  return (
    <>
      {startIcon && <ButtonIcon className={'mr-1'}>{startIcon}</ButtonIcon>}
      {children}
      {endIcon && <ButtonIcon className={'ml-1'}>{endIcon}</ButtonIcon>}
    </>
  );
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
    startIcon,
    endIcon,
    size = group?.size || 'md',
    level = group?.level || 'primary',
    variant = group?.variant || 'solid',
    fullWidth = false,
    className,
    ...rest
  } = props;

  const { ref: _ref, type: defaultType } = useButtonType(as);

  const contentProps = { startIcon, endIcon, children };

  return (
    <Box
      as={as}
      {...rest}
      className={clsx(
        className,
        ButtonStyles.base,
        ButtonStyles.sizes[size],
        ButtonStyles.levels[level],
        ButtonStyles.variants[variant].base,
        ButtonStyles.variants[variant][level],
        fullWidth && ButtonStyles.fullWidth
      )}
      disabled={disabled || loading}
      data-active={dataAttr(active)}
      data-loading={dataAttr(loading)}
      type={type ?? defaultType}
      ref={useMergedRef(ref, _ref)}
    >
      {loading ? (
        loadingText || (
          <span className={'opacity-0'}>
            <ButtonContent {...contentProps} />
          </span>
        )
      ) : (
        <ButtonContent {...contentProps} />
      )}
    </Box>
  );
});

if (__DEV__) {
  Button.displayName = '@agile-ui/react/Button';
}
