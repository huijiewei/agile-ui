import type { Dict } from '@agile-ui/utils';
import { cx } from '@twind/core';
import { Spinner } from '../spinner/Spinner';
import type { PrimitiveComponentProps } from '../utils/component';
import type { Size } from '../utils/types';

export type ButtonSpinnerProps = {
  size: Size;
  label?: string;
  placement?: 'start' | 'end';
};

const SpinnerSizes: Dict<Size> = {
  xs: 'xs',
  sm: 'sm',
  md: 'sm',
  lg: 'md',
  xl: 'lg',
};

export const ButtonSpinner = (props: PrimitiveComponentProps<'span', ButtonSpinnerProps>) => {
  const { label, size, placement, className, children = <Spinner size={SpinnerSizes[size]} />, ...rest } = props;

  return (
    <span
      className={cx(
        'flex items-center',
        label ? 'relative' : 'absolute',
        placement === 'start' ? label && 'mr-2' : label && 'ml-2',
        className
      )}
      {...rest}
    >
      {children}
    </span>
  );
};

ButtonSpinner.displayName = 'ButtonSpinner';
