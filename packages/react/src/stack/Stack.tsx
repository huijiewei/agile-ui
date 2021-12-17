import { __DEV__ } from '@agile-ui/utils';
import { polymorphicComponent } from '../utils/polymorphic';
import { stackRecipe } from './Stack.css';

type StackProps = {
  direction?: 'horizontal' | 'vertical';
};

export const Stack = polymorphicComponent<'div', StackProps>((props, ref) => {
  const { as: Component = 'div', children, direction = 'horizontal', ...rest } = props;

  return (
    <Component {...rest} className={stackRecipe({ direction })} ref={ref}>
      {children}
    </Component>
  );
});

if (__DEV__) {
  Stack.displayName = 'Stack';
}
