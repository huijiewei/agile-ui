import { __DEV__ } from '@agile-ui/utils';
import { tx } from 'twind';
import { Spinner } from '../spinner/Spinner';
import type { PrimitiveComponentProps } from '../utils/component';
import type { Size } from '../utils/types';

export type ButtonSpinnerProps = {
  size: Size;
  label?: string;
  placement?: 'start' | 'end';
};

export const ButtonSpinner = (props: PrimitiveComponentProps<'span', ButtonSpinnerProps>) => {
  const { label, size, placement, className, children = <Spinner size={size} />, ...rest } = props;

  return (
    <span
      className={tx(
        'flex items-center',
        label ? 'relative' : 'absolute',
        placement === 'start' ? (label ? `mr-1` : 'mr-0') : label ? `ml-1` : 'ml-0',
        className
      )}
      {...rest}
    >
      {children}
    </span>
  );
};

if (__DEV__) {
  ButtonSpinner.displayName = 'ButtonSpinner';
}
