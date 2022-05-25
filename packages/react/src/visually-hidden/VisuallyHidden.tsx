import { __DEV__ } from '@agile-ui/utils';
import { ComponentPropsWithoutRef } from 'react';
import { tx } from 'twind';

export const VisuallyHidden = (props: ComponentPropsWithoutRef<'span'>) => {
  const { children, className, ...rest } = props;

  return (
    <span {...rest} className={tx('sr-only', className)}>
      {children}
    </span>
  );
};

if (__DEV__) {
  VisuallyHidden.displayName = 'VisuallyHidden';
}
