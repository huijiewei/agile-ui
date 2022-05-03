import { __DEV__ } from '@agile-ui/utils';
import { ComponentPropsWithoutRef } from 'react';
import { twClsx } from '../utils/tailwind';

export const VisuallyHidden = (props: ComponentPropsWithoutRef<'span'>) => {
  const { children, className, ...rest } = props;

  return (
    <span {...rest} className={twClsx('sr-only', className)}>
      {children}
    </span>
  );
};

if (__DEV__) {
  VisuallyHidden.displayName = 'VisuallyHidden';
}
