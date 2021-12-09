import { ElementType, forwardRef, ReactElement, ReactNode, useCallback, useState } from 'react';
import { __DEV__, dataAttr } from '@agile-ui/utils';
import { PolymorphicComponent, Primitive } from '../primitive/Primitive';
import { ButtonVariants, variants } from './Button.css';
import clsx from 'clsx';
import { useButtonGroup } from './ButtonGroup';
import { useMergeRefs } from '@agile-ui/react-hooks';

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

export const Button: PolymorphicComponent<ButtonOwnProps, typeof DEFAULT_TAG> = forwardRef((props, ref) => {
  const group = useButtonGroup();

  const {
    as = DEFAULT_TAG,
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
    ...restProps
  } = props;

  const { ref: _ref, type: defaultType } = useButtonType(as);

  return (
    <Primitive
      as={as}
      className={clsx(className, variants({ size, level, variant, disabled }))}
      disabled={disabled || loading}
      data-active={dataAttr(active)}
      data-loading={dataAttr(loading)}
      aria-disabled={disabled}
      type={type ?? defaultType}
      ref={useMergeRefs(ref, _ref)}
      {...restProps}
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
