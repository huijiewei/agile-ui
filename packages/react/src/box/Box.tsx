import { __DEV__ } from '@agile-ui/utils';
import clsx from 'clsx';
import { ReactNode } from 'react';
import { polymorphicComponent } from '../utils/polymorphic';

type BoxProps = {
  children?: ReactNode;
};

export const Box = polymorphicComponent<'div', BoxProps>((props, ref) => {
  const { as: Component = 'div', className, children, ...rest } = props;

  return (
    <Component className={clsx(className)} ref={ref} {...rest}>
      {children}
    </Component>
  );
});

if (__DEV__) {
  Box.displayName = 'Box';
}
