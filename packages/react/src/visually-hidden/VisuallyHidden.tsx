import { __DEV__ } from '@agile-ui/utils';
import clsx from 'clsx';
import { ComponentPropsWithoutRef } from 'react';

export const VisuallyHidden = (props: ComponentPropsWithoutRef<'span'>) => {
  const { children, className, ...rest } = props;

  return (
    <span {...rest} className={clsx(className, 'sr-only')}>
      {children}
    </span>
  );
};

if (__DEV__) {
  VisuallyHidden.displayName = '@agile-ui/react/VisuallyHidden';
}
