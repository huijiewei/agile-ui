import { polymorphicComponent } from '../utils/component';
import { __DEV__ } from '@agile-ui/utils';

export const Box = polymorphicComponent((props, ref) => {
  const { as: Component = 'div', ...rest } = props;

  return <Component ref={ref} {...rest} />;
});

if (__DEV__) {
  Box.displayName = 'Box';
}
