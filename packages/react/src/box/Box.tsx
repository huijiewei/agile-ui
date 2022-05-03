import { __DEV__ } from '@agile-ui/utils';
import { polymorphicComponent } from '../utils/polymorphic';

export const Box = polymorphicComponent<'div', unknown>((props, ref) => {
  const { as: Component = 'div', children, ...rest } = props;

  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
});

if (__DEV__) {
  Box.displayName = 'Box';
}
