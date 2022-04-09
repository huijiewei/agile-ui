import { __DEV__ } from '@agile-ui/utils';
import { polymorphicComponent } from '../utils/polymorphic';

type StackProps = {
  direction?: 'horizontal' | 'vertical';
};

export const Stack = polymorphicComponent<'div', StackProps>((props, ref) => {
  const { as: Component = 'div', children, direction = 'horizontal', ...rest } = props;

  return (
    <Component {...rest} className={''} ref={ref}>
      {children}
    </Component>
  );
});

if (__DEV__) {
  Stack.displayName = 'Stack';
}
