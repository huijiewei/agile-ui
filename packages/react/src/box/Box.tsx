import { __DEV__ } from '@agile-ui/utils';
import { ReactNode } from 'react';
import { polymorphicComponent } from '../utils/polymorphic';

type BoxProps = {
  children?: ReactNode;
};

export const Box = polymorphicComponent<'div', BoxProps>((props, ref) => {
  const { as: Component = 'div', children, ...rest } = props;

  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
});

if (__DEV__) {
  Box.displayName = '@agile-ui/react/Box';
}
