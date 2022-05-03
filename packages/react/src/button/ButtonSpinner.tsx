import { __DEV__ } from '@agile-ui/utils';
import { ComponentPropsWithoutRef } from 'react';
import { Spinner } from '../spinner/Spinner';
import { twClsx } from '../utils/tailwind';
import { Size } from '../utils/types';

export type ButtonSpinnerProps = ComponentPropsWithoutRef<'div'> & {
  size: Size;
  label?: string;
  placement?: 'start' | 'end';
};

export const ButtonSpinner = (props: ButtonSpinnerProps) => {
  const { label, size, placement, className, children = <Spinner size={size} />, ...rest } = props;

  return (
    <div
      className={twClsx(
        'flex items-center',
        label ? 'relative' : 'absolute',
        placement === 'start' ? (label ? `mr-1` : 'mr-0') : label ? `ml-1` : 'ml-0',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

if (__DEV__) {
  ButtonSpinner.displayName = 'ButtonSpinner';
}
