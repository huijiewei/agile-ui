import { ElementType, forwardRef, ReactElement, useCallback, useState } from 'react';
import { __DEV__, dataAttr } from '@agile-ui/utils';
import { ButtonVariants, variants } from './Button.css';
import clsx from 'clsx';
import { useButtonGroup } from './ButtonGroup';
import { useMergeRefs } from '@agile-ui/react-hooks';
import { PolymorphicComponentProps } from '@agile-ui/react';

const DEFAULT_TAG = 'button';

export type Props = ButtonVariants & {
  type?: 'button' | 'reset' | 'submit';
  active?: boolean;
  loading?: boolean;
  loadingText?: string;
  fullWidth?: boolean;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
};

export type ButtonProps<C extends ElementType> = PolymorphicComponentProps<C, Props>;

type ButtonComponent = <C extends ElementType = typeof Button>(props: ButtonProps<C>) => ReactElement | null;

export const Button: ButtonComponent & { displayName?: string } = forwardRef((props, ref) => {
  const group = useButtonGroup();

  const {
    as: Component = DEFAULT_TAG,
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
      className={clsx(className, variants({ size, level, variant, disabled }))}
      disabled={disabled || loading}
      data-active={dataAttr(active)}
      data-loading={dataAttr(loading)}
      aria-disabled={disabled}
      type={type ?? defaultType}
      ref={useMergeRefs(ref, _ref)}
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
