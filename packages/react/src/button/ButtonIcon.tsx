import { __DEV__ } from '@agile-ui/utils';
import clsx from 'clsx';
import { ComponentPropsWithoutRef } from 'react';

export const ButtonIcon = (props: ComponentPropsWithoutRef<'span'>) => {
  const { children, className, ...rest } = props;

  return (
    <span className={clsx(className, '')} {...rest}>
      {children}
    </span>
  );
};

if (__DEV__) {
  ButtonIcon.displayName = '@agile-ui/react/ButtonIcon';
}
