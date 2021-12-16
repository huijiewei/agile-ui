import { __DEV__ } from '@agile-ui/utils';
import { polymorphicComponent } from '../utils/polymorphic';
import { StackVariants, variants } from './Stack.css';

type StackProps = StackVariants;

export const Stack = polymorphicComponent<'div', StackProps>((props, ref) => {
  const { as: Component = 'div', children, direction = 'column', ...rest } = props;

  return (
    <Component {...rest} className={variants({ direction })} ref={ref}>
      {children}
    </Component>
  );
});

if (__DEV__) {
  Stack.displayName = 'Stack';
}
