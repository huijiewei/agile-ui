import { __DEV__ } from '@agile-ui/utils';
import { polymorphicComponent } from '../utils/polymorphic';
import { StackVariants, variants } from './Stack.css';

const DEFAULT_TAG = 'div';

type StackProps = StackVariants;

export const Stack = polymorphicComponent<typeof DEFAULT_TAG, StackProps>((props, ref) => {
  const { as: Component = DEFAULT_TAG, children, direction = 'column', ...rest } = props;

  return (
    <Component {...rest} className={variants({ direction })} ref={ref}>
      {children}
    </Component>
  );
});

if (__DEV__) {
  Stack.displayName = 'Stack';
}
